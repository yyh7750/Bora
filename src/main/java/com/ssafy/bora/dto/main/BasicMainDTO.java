package com.ssafy.bora.dto.main;

import com.ssafy.bora.entity.Station;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BasicMainDTO {

    private String userId;

    private String stationName;

    private String bannerUrl;

    private String nickName;

    private Long followCnt;

    public static BasicMainDTO convertEntityToBasicMainDTO(Station station, TopTenDTO ttDto){
        BasicMainDTO bmDto = new BasicMainDTO();
        bmDto.bannerUrl=station.getUser().getProfileImg();
        bmDto.userId=station.getUser().getId();
        bmDto.nickName=station.getUser().getNickName();
        bmDto.stationName=station.getName();
        bmDto.followCnt = ttDto.getFollowCnt();
        return bmDto;
    }
}