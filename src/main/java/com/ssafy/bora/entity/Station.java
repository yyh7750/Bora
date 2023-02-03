package com.ssafy.bora.entity;

import com.ssafy.bora.dto.StationDTO;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    private boolean mon;

    private boolean tue;

    private boolean wen;

    private boolean thu;

    private boolean fri;

    private boolean sat;

    private boolean sun;

    public static Station convertDtoToStation(User dj, StationDTO stationDTO) {
        Station station = new Station();
        station.user = dj;
        station.category = stationDTO.getCategory();
        station.startTime = stationDTO.getStartTime();
        station.endTime = stationDTO.getEndTime();
        station.description = stationDTO.getDescription();
        station.name = stationDTO.getName();
        station.notice = stationDTO.getNotice();
        station.mon = stationDTO.isMon();
        station.tue = stationDTO.isTue();
        station.wen = stationDTO.isWen();
        station.thu = stationDTO.isThu();
        station.fri = stationDTO.isFri();
        station.sat = stationDTO.isSat();
        station.sun = stationDTO.isSun();
        return station;
    }
}