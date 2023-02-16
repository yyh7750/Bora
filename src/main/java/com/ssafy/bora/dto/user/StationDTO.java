package com.ssafy.bora.dto.user;

import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Getter
@NoArgsConstructor
public class StationDTO {

    private String userId;

    private String name;

    private String startTime;

    private String endTime;

    private String description;

    private String notice;

    private String category;

    private String day;

    private String thumbnail;

    private String banner;

    private int followCnt;

    //Fixme starttime, endtime 이거 맞음?
    public static StationDTO convertStationToDTO(Station station, int followCnt) {
        StationDTO stationDTO = new StationDTO();
        stationDTO.userId = station.getUser().getId();
        stationDTO.category = station.getCategory();
        stationDTO.startTime = station.getStartTime().format(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT));
        stationDTO.endTime = station.getEndTime().format(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT));
        stationDTO.description = station.getDescription();
        stationDTO.name = station.getName();
        stationDTO.notice = station.getNotice();
        stationDTO.day = station.getDay();
        stationDTO.followCnt = followCnt;
        stationDTO.banner = station.getBanner();
        stationDTO.thumbnail = station.getThumbnail();
        return stationDTO;
    }
}