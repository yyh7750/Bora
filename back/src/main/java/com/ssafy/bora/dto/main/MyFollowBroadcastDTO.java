package com.ssafy.bora.dto.main;

import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyFollowBroadcastDTO {
    private String userId;
    private String sessionId;
    private String bannerUrl;
    private String userUrl;
    private String nickName;
    private String stationName;
    public static MyFollowBroadcastDTO convertEntityToMyFollowBroadcastDTO(String sessionId, Station station){
        MyFollowBroadcastDTO mfbDTO = new MyFollowBroadcastDTO();
        mfbDTO.sessionId=sessionId;
        mfbDTO.bannerUrl=station.getBanner();
        mfbDTO.userUrl=station.getUser().getProfileImg();
        mfbDTO.userId=station.getUser().getId();
        mfbDTO.nickName=station.getUser().getNickName();
        mfbDTO.stationName=station.getName();
        return mfbDTO;
    }

}
