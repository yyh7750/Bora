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

    private boolean mon;

    private boolean tue;

    private boolean wen;

    private boolean thu;

    private boolean fri;

    private boolean sat;

    private boolean sun;

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
        this.mon = station.isMon();
        this.tue = station.isTue();
        this.wen = station.isWen();
        this.thu = station.isThu();
        this.fri = station.isFri();
        this.sat = station.isSat();
        this.sun = station.isSun();
    }
}