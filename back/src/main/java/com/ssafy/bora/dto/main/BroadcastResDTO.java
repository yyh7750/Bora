package com.ssafy.bora.dto.main;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BroadcastResDTO {
    private String userId;
    private String nickName;
    private String imgUrl;
    private String stationName;
    private String title;
    private String mood;
    private String category;
    private String sessionId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


    public static BroadcastResDTO convertEntityToBroadcastDTO(Broadcast broadcast, Station station ){
        BroadcastResDTO bmDto = new BroadcastResDTO();
        bmDto.userId=station.getUser().getId();
        bmDto.nickName=station.getUser().getNickName();
        bmDto.stationName=station.getName();
        bmDto.title = broadcast.getTitle();
        bmDto.mood=broadcast.getMood();
        bmDto.category = station.getCategory();
        bmDto.sessionId = broadcast.getSessionId();
        bmDto.startTime = station.getStartTime();
        bmDto.endTime=station.getEndTime();
        return bmDto;
    }

    @QueryProjection
    public BroadcastResDTO(String userId,String nickName, String imgUrl,String stationName, String title, String mood, String category, String sessionId, LocalDateTime startTime, LocalDateTime endTime){
        this.userId=userId;
        this.nickName=nickName;
        this.imgUrl=imgUrl;
        this.stationName=stationName;
        this.title=title;
        this.mood=mood;
        this.category=category;
        this.sessionId=sessionId;
        this.startTime=startTime;
        this.endTime=endTime;
    }
}
