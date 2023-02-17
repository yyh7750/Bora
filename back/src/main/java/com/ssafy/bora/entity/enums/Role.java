package com.ssafy.bora.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"),
    CUSTOMER("ROLE_CUSTOMER");

    private final String key;
}
