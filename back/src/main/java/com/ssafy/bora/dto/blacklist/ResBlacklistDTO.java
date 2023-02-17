package com.ssafy.bora.dto.blacklist;

import com.ssafy.bora.entity.Blacklist;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Getter
@NoArgsConstructor
public class ResBlacklistDTO {

    private String djId;

    private String djNickName;

    private String viewerId;

    private String viewerNickName;

    public static ResBlacklistDTO convertEntityToResDTO(Blacklist black) {
        ResBlacklistDTO resBlacklistDTO = new ResBlacklistDTO();
        resBlacklistDTO.djId = black.getDj().getId();
        resBlacklistDTO.djNickName = black.getDj().getNickName();
        resBlacklistDTO.viewerId = black.getViewer().getId();
        resBlacklistDTO.viewerNickName = black.getViewer().getNickName();
        return resBlacklistDTO;
    }
}