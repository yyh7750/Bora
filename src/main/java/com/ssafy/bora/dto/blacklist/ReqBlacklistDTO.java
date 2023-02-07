package com.ssafy.bora.dto.blacklist;

import com.ssafy.bora.entity.Blacklist;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqBlacklistDTO {

    private String djId;

    private String viewerId;
}