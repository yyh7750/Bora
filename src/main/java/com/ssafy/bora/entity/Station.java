package com.ssafy.bora.entity;

import com.ssafy.bora.dto.user.StationDTO;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Column(name = "thumbnail_img")
    private String thumbnail;

    @Column(name = "banner_img")
    private String banner;

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

    private boolean isDelete;

    private boolean mon;

    private boolean tue;

    private boolean wen;

    private boolean thu;

    private boolean fri;

    private boolean sat;

    private boolean sun;

    public static Station convertDtoToStation(User dj, StationDTO stationDTO) {
        Station station = new Station();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        station.user = dj;
        station.category = stationDTO.getCategory();
        station.startTime = LocalDateTime.parse(stationDTO.getStartTime(), formatter);
        station.endTime = LocalDateTime.parse(stationDTO.getEndTime(), formatter);
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

    public void createStation() {
        this.isDelete = false;
    }

    /**
     * desc: 업데이트 및 방송국을 삭제했다가 다시 생성할 경우 사용하는 메소드
     *
     * @param station
     */
    public void changeStation(Station station) {
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
    @Builder
    public Station(String thumbnail, String banner) {
        this.thumbnail = thumbnail;
        this.banner = banner;
    }
    public void updateThumbNailImg(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    public void updateBannerImg(String banner) {
        this.banner = banner;
    }
}