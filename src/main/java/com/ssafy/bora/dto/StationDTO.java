package com.ssafy.bora.dto;

import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class StationDTO {

    private String userId;

    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String description;

    private String notice;

    private String category;

    private Boolean mon;

    private Boolean tue;

    private Boolean wen;

    private Boolean thu;

    private Boolean fri;

    private Boolean sat;

    private Boolean sun;

//    public StationDTO convertStationEntityToDTO(Station station){
//        return StationDTO.builder()
//                .userId(station.getUser().getId())
//                .category(station.getCategory())
//                .startTime(station.getStartTime())
//                .endTime(station.getEndTime())
//                .description(station.getDescription())
//                .name(station.getName())
//                .notice(station.getNotice())
//                .mon(station.getMon())
//                .tue(station.getTue())
//                .wen(station.getWen())
//                .thu(station.getThu())
//                .fri(station.getFri())
//                .sat(station.getSat())
//                .sun(station.getSun())
//                .build();
//    }

    public void convertStationToDTO(Station station) {
        this.userId = station.getUser().getId();
        this.category = station.getCategory();
        this.startTime = station.getStartTime();
        this.endTime = station.getEndTime();
        this.description = station.getDescription();
        this.name = station.getName();
        this.notice = station.getNotice();
        this.mon = station.getMon();
        this.tue = station.getTue();
        this.wen = station.getWen();
        this.thu = station.getThu();
        this.fri = station.getFri();
        this.sat = station.getSat();
        this.sun = station.getSun();
    }
}