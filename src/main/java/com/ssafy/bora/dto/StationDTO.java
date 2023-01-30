package com.ssafy.bora.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class StationDTO {

    private String userId;

    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String desc;

    private String notice;

    private Map<String, String> schedule;

    private String category;
}
