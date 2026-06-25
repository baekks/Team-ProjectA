package org.tourGo.service.destination;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.tourGo.common.HttpRequest;
import org.tourGo.models.destination.entity.DestinationDetail;
import org.tourGo.models.entity.user.User;
import org.tourGo.models.user.UserRepository;

@Service
public class DestinationService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private DestinationDetailRepository destinationDetailRepository;
	
	@Value("${tourapi.service-key:}")
	private String serviceKey;
	
	private final String apiBaseUrl = "https://apis.data.go.kr/B551011/KorService2/areaBasedList2";
	
	public void responseList(int areaCode, String userId) throws IOException {
		
		User user = userRepository.findByUserId(userId).orElseThrow();
		importArea(areaCode);
	}
	
	public int importAllAreas() throws IOException {
		int imported = 0;
		
		for (Integer areaCode : areaMap().keySet()) {
			imported += importArea(areaCode);
		}
		
		return imported;
	}
	
	public int importArea(int areaCode) throws IOException {
		if (serviceKey == null || serviceKey.isBlank()) {
			throw new IllegalStateException("TOUR_API_SERVICE_KEY 환경변수 또는 tourapi.service-key 설정이 필요합니다.");
		}
		
		Map<Integer, String> areaMap = areaMap();
		
		if (!areaMap.containsKey(areaCode)) {
			throw new IllegalArgumentException("지원하지 않는 지역 코드입니다: " + areaCode);
		}
		
		try {
			JSONParser parser = new JSONParser();
			JSONObject jsonObj = requestTourApi(parser, areaCode, 1, 1);
			
			JSONObject response = (JSONObject) jsonObj.get("response");
			JSONObject body = (JSONObject) response.get("body");
			Integer totalCount = Math.min(50, Integer.parseInt(body.get("totalCount").toString()));
			Integer count = (totalCount % 10 == 0) ? totalCount / 10 : (totalCount / 10) + 1;
			int imported = 0;
		
			for(int i = 1; i <= count; i++) {
				jsonObj = requestTourApi(parser, areaCode, i, 10);
				response = (JSONObject) jsonObj.get("response");
				body = (JSONObject) response.get("body");
				JSONObject items = (JSONObject) body.get("items");
				Object rawItems = items.get("item");
				JSONArray item = rawItems instanceof JSONArray ? (JSONArray) rawItems : new JSONArray();
			
				for(int j = 0; j < item.size(); j++) {
					JSONObject object = (JSONObject) item.get(j);
					String contentId = value(object, "contentid");
					Long destinationNo = contentId.isBlank() ? null : Long.valueOf(contentId);
					
					if (destinationNo != null && destinationDetailRepository.existsById(destinationNo)) {
						continue;
					}
					
					DestinationDetail detail = DestinationDetail.builder()
																.destinationNo(destinationNo)
																.tourDestination(areaMap.get(Integer.valueOf(object.get("areacode").toString())))
																.tourTitle(value(object, "title"))
																.tourImg(value(object, "firstimage"))
																.mapX(doubleValue(object, "mapx"))
																.mapY(doubleValue(object, "mapy"))
																.tourAddr(value(object, "addr1"))
																.build();
					
					destinationDetailRepository.save(detail);
					imported++;
				}
			}
			
			return imported;
			
		} catch (ParseException e) {
			throw new IOException("관광공사 API 응답을 파싱하지 못했습니다.", e);
		}
	}
	
	private JSONObject requestTourApi(JSONParser parser, int areaCode, int pageNo, int numOfRows) throws IOException, ParseException {
		StringBuilder urlBuilder = new StringBuilder(apiBaseUrl).append("?");
		urlBuilder.append("serviceKey=").append(encodedServiceKey());
		urlBuilder.append("&").append("MobileOS=").append(URLEncoder.encode("ETC", "UTF-8"));
		urlBuilder.append("&").append("MobileApp=").append(URLEncoder.encode("TourGo", "UTF-8"));
		urlBuilder.append("&").append("numOfRows=").append(URLEncoder.encode(String.valueOf(numOfRows), "UTF-8"));
		urlBuilder.append("&").append("pageNo=").append(URLEncoder.encode(String.valueOf(pageNo), "UTF-8"));
		urlBuilder.append("&").append("_type=").append(URLEncoder.encode("json", "UTF-8"));
		urlBuilder.append("&").append("contentTypeId=").append(URLEncoder.encode("12", "UTF-8"));
		urlBuilder.append("&").append("areaCode=").append(URLEncoder.encode(String.valueOf(areaCode), "UTF-8"));
		
		HttpRequest<Map<String, String>> request = new HttpRequest<>();
		request.setUrl(urlBuilder.toString());
		String response = request.request().toString();
		
		if (response == null || !response.trim().startsWith("{")) {
			throw new IOException("관광공사 API 오류 응답: " + response);
		}
		
		JSONObject jsonObj = (JSONObject) parser.parse(response);
		JSONObject apiResponse = (JSONObject) jsonObj.get("response");
		JSONObject header = (JSONObject) apiResponse.get("header");
		String resultCode = String.valueOf(header.get("resultCode"));
		
		if (!"0000".equals(resultCode)) {
			throw new IOException("관광공사 API 오류(" + resultCode + "): " + header.get("resultMsg"));
		}
		
		return jsonObj;
	}
	
	private Map<Integer, String> areaMap() {
		Map<Integer, String> areaMap = new HashMap<>();
		areaMap.put(1, "서울");
		areaMap.put(2, "인천");
		areaMap.put(3, "대전");
		areaMap.put(4, "대구");
		areaMap.put(5, "광주");
		areaMap.put(6, "부산");
		areaMap.put(7, "울산");
		areaMap.put(8, "세종");
		areaMap.put(31, "경기");
		areaMap.put(32, "강원");
		areaMap.put(33, "충북");
		areaMap.put(34, "충남");
		areaMap.put(35, "경북");
		areaMap.put(36, "경남");
		areaMap.put(37, "전북");
		areaMap.put(38, "전남");
		areaMap.put(39, "제주");
		
		return areaMap;
	}
	
	private String value(JSONObject object, String key) {
		Object value = object.get(key);
		return value == null ? "" : value.toString();
	}
	
	private double doubleValue(JSONObject object, String key) {
		String value = value(object, key);
		return value.isBlank() ? 0D : Double.valueOf(value).doubleValue();
	}
	
	private String encodedServiceKey() throws IOException {
		if (serviceKey.contains("%")) {
			return serviceKey;
		}
		
		return URLEncoder.encode(serviceKey, "UTF-8");
	}
}
