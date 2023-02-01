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
//
//    public Station createStationWithDTO(User dj, StationDTO stationDTO) {
////        return Station.builder()
////                .user(dj)
////                .category(stationDTO.getCategory())
////                .startTime(stationDTO.getStartTime())
////                .endTime(stationDTO.getEndTime())
////                .description(stationDTO.getDescription())
////                .name(stationDTO.getName())
////                .notice(stationDTO.getNotice())
////                .mon(stationDTO.getMon())
////                .tue(stationDTO.getTue())
////                .wen(stationDTO.getWen())
////                .thu(stationDTO.getThu())
////                .fri(stationDTO.getFri())
////                .sat(stationDTO.getSat())
////                .sun(stationDTO.getSun())
//                .build();
//    }

    public void convertDtoToStation(User dj, StationDTO stationDTO) {
        this.user = dj;
        this.category = stationDTO.getCategory();
        this.startTime = stationDTO.getStartTime();
        this.endTime = stationDTO.getEndTime();
        this.description = stationDTO.getDescription();
        this.name = stationDTO.getName();
        this.notice = stationDTO.getNotice();
        this.mon = stationDTO.isMon();
        this.tue = stationDTO.isTue();
        this.wen = stationDTO.isWen();
        this.thu = stationDTO.isThu();
        this.fri = stationDTO.isFri();
        this.sat = stationDTO.isSat();
        this.sun = stationDTO.isSun();
    }
}