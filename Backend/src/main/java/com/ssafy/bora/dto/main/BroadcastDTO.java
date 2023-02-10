package com.ssafy.bora.dto.main;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class BroadcastDTO {
    private String userId;
    private String nickName;
    //private 어떠한 ++이미지
    private String stationName;
    private String title;
    private String mood;
    private String category;
    private String sessionId;
    private LocalDateTime startTime;

//    public static BroadcastDTO convertEntityToBroadcastDTO(Broadcast broadcast, Station station ){
//        BroadcastDTO bmDto = new BroadcastDTO();
//        String[] moods = broadcast.getMood().split(",");
//        bmDto.userId=station.getUser().getId();
//        bmDto.nickName=station.getUser().getNickName();
//        bmDto.stationName=station.getName();
//        bmDto.title = broadcast.getTitle();
//        bmDto.mood1 = moods[0];
//        bmDto.mood2 = moods[1];
//        bmDto.mood3 = moods[2];
//        bmDto.category = station.getCategory();
//        bmDto.sessionId = broadcast.getSessionId();
//        bmDto.startTime = broadcast.getStartBroad();
//        return bmDto;
//    }

    @QueryProjection
    public BroadcastDTO(String userId, String nickName, String stationName, String title, String mood, String category, String sessionId, LocalDateTime startTime){
        this.userId=userId;
        this.nickName=nickName;
        this.stationName=stationName;
        this.title=title;
        this.mood=mood;
        this.category=category;
        this.sessionId=sessionId;
        this.startTime=startTime;
    }
}
