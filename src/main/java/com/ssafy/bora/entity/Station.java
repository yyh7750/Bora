package com.ssafy.bora.entity;

import com.ssafy.bora.dto.StationDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Station implements Serializable {

    @Id
    @Column(name = "user_id", nullable = false)
    private String id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 32)
    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Column(length = 1024)
    private String description;

    @Column(length = 64)
    private String notice;

    @Column(length = 16)
    private String category;

    private Boolean mon;

    private Boolean tue;

    private Boolean wen;

    private Boolean thu;

    private Boolean fri;

    private Boolean sat;

    private Boolean sun;

    public Station convertStationDtoToEntity(User dj, StationDTO stationDTO) {
        return Station.builder()
                .user(dj)
                .category(stationDTO.getCategory())
                .startTime(stationDTO.getStartTime())
                .endTime(stationDTO.getEndTime())
                .description(stationDTO.getDescription())
                .name(stationDTO.getName())
                .notice(stationDTO.getNotice())
                .mon(stationDTO.getMon())
                .tue(stationDTO.getTue())
                .wen(stationDTO.getWen())
                .thu(stationDTO.getThu())
                .fri(stationDTO.getFri())
                .sat(stationDTO.getSat())
                .sun(stationDTO.getSun())
                .build();
    }

    public void updateStation(StationDTO stationDTO) {
        
    }
}