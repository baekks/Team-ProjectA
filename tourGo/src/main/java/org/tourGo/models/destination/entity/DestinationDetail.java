package org.tourGo.models.destination.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.tourGo.common.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DestinationDetail extends BaseEntity {
	
	@Id 
	private Long destinationNo;// db테이블 증감번호

	@Column(nullable = false)
	private String tourTitle;			// 여행지 이름
	@Column(nullable = false)
	private String tourDestination; 	// 지역
	private String tourImg;				// 여행지 이미지
	private String tourDetaiIinfo;		// 여행지 상세정보
	private double mapX;				// 여행지 x좌표
	private double mapY;				// 여행지 y좌표
	private String tourAddr;			// 여행지 주소
	private String tourHomepage;		// 여행지 인터넷 사이트
	private String tourOperatingHour;	// 여행지 영업시간
	private String tourHoliday;			// 관광지 휴무일
	private String tourCharges;			// 관광지 이용요금
	private String tourNumber;			// 관광지 문의 연락처
	
	@Column(columnDefinition = "int default '0'", insertable=false, updatable=false)
	private int tourHits;			// 관광지 조회수
	@Column(columnDefinition = "int default '0'", insertable=false, updatable=false)
	private int tourHeart;			// 관광지 좋아요
}
