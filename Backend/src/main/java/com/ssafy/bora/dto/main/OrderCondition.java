package com.ssafy.bora.dto.main;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OrderCondition {
    private String maxView;
    private String follow;
    private String recommend;
    private String newest;
}
