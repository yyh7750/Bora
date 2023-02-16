package com.ssafy.bora.dto.user.playlist;

import com.ssafy.bora.entity.Playlist;
import com.ssafy.bora.entity.Station;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
public class ResPlaylistDTO {

    private String djName;

    private String stationName;

    private String startTime;

    private String endTime;

    private String day;

    public static ResPlaylistDTO convertStationToDTO(Station stationInfo) {
        String startTime = stationInfo.getStartTime().format(DateTimeFormatter.ofPattern("HH"));
        String endTime = stationInfo.getEndTime().format(DateTimeFormatter.ofPattern("HH"));

        ResPlaylistDTO resPlaylistDTO = new ResPlaylistDTO();
        resPlaylistDTO.djName = stationInfo.getUser().getNickName();
        resPlaylistDTO.stationName = stationInfo.getName();
        resPlaylistDTO.startTime = startTime;
        resPlaylistDTO.endTime = endTime;
        return resPlaylistDTO;
    }

    public static ResPlaylistDTO convertPlaylistToDTO(Playlist playlist) {
        ResPlaylistDTO resPlaylistDTO = new ResPlaylistDTO();
        resPlaylistDTO.djName = playlist.getDjName();
        resPlaylistDTO.stationName = playlist.getStationName();
        resPlaylistDTO.startTime = playlist.getStartTime();
        resPlaylistDTO.endTime = playlist.getEndTime();

        resPlaylistDTO.day = playlist.getDay();
        return resPlaylistDTO;
    }
}