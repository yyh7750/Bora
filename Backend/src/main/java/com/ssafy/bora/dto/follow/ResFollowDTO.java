package com.ssafy.bora.dto.follow;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResFollowDTO {

    private String djNickName;

    private String viewerNickName;

    public static ResFollowDTO addDTO(String djNickName, String viewerNickName) {
        ResFollowDTO resFollowDTO = new ResFollowDTO();
        resFollowDTO.djNickName = djNickName;
        resFollowDTO.viewerNickName = viewerNickName;
        return resFollowDTO;
    }
}
