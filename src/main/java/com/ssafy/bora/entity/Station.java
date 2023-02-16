package com.ssafy.bora.entity;

import com.ssafy.bora.dto.user.MaxViewerDTO;
import com.ssafy.bora.dto.user.StationDTO;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@DynamicInsert
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

    @Column(name = "max_viewer")
    @ColumnDefault("0")
    private long maxViewer;

    private boolean isDelete;

    private String day;

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
        station.day = stationDTO.getDay();
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
        this.day = station.getDay();
    }

    public void updateMaxViewer(MaxViewerDTO maxViewerDTO){
        this.maxViewer=maxViewerDTO.getViewerSum()/maxViewerDTO.getNum();
    }
    public void updateThumbNailImg(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void updateBannerImg(String banner) {
        this.banner = banner;
    }
}