package com.ssafy.bora.dto;

import com.ssafy.bora.entity.Station;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public StationDTO convertStationEntityToDTO(Station station){
        return StationDTO.builder()
                .userId(station.getUser().getId())
                .category(station.getCategory())
                .startTime(station.getStartTime())
                .endTime(station.getEndTime())
                .description(station.getDescription())
                .name(station.getName())
                .notice(station.getNotice())
                .mon(station.getMon())
                .tue(station.getTue())
                .wen(station.getWen())
                .thu(station.getThu())
                .fri(station.getFri())
                .sat(station.getSat())
                .sun(station.getSun())
                .build();
    }
}