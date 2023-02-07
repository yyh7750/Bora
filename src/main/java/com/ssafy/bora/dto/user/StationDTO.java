package com.ssafy.bora.dto.user;

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

    public static StationDTO convertStationToDTO(Station station) {
        StationDTO stationDTO = new StationDTO();
        stationDTO.userId = station.getUser().getId();
        stationDTO.category = station.getCategory();
        stationDTO.startTime = station.getStartTime();
        stationDTO.endTime = station.getEndTime();
        stationDTO.description = station.getDescription();
        stationDTO.name = station.getName();
        stationDTO.notice = station.getNotice();
        stationDTO.mon = station.isMon();
        stationDTO.tue = station.isTue();
        stationDTO.wen = station.isWen();
        stationDTO.thu = station.isThu();
        stationDTO.fri = station.isFri();
        stationDTO.sat = station.isSat();
        stationDTO.sun = station.isSun();
        return stationDTO;
    }
}