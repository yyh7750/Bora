package com.ssafy.bora.dto;

import com.ssafy.bora.entity.Blacklist;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BlacklistDTO {

    private String djId;

    private String viewerId;

    public BlacklistDTO(Blacklist blacklist) {
        this.djId = blacklist.getDj().getId();
        this.viewerId = blacklist.getViewer().getId();
    }
}