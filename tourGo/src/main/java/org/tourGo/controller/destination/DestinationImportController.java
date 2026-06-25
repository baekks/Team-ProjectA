package org.tourGo.controller.destination;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.tourGo.common.JsonResult;
import org.tourGo.service.destination.DestinationService;

@RestController
public class DestinationImportController {

	@Autowired
	private DestinationService destinationService;

	@GetMapping("/dev/destinations/import")
	public JsonResult<?> importAll() throws IOException {
		int imported = destinationService.importAllAreas();

		return new JsonResult<>(true, "관광지 데이터 " + imported + "건이 추가되었습니다.", null);
	}

	@GetMapping("/dev/destinations/import/{areaCode}")
	public JsonResult<?> importArea(@PathVariable int areaCode) throws IOException {
		int imported = destinationService.importArea(areaCode);

		return new JsonResult<>(true, "관광지 데이터 " + imported + "건이 추가되었습니다.", null);
	}
}
