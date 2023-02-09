package com.ssafy.bora.entity;

import com.ssafy.bora.dto.user.playlist.ReqPlaylistDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class Playlist implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 3)
    private String day;

    @Column(length = 10)
    private String djName;

    @Column(length = 32)
    private String stationName;

    @Column(length = 2)
    private String startTime;

    @Column(length = 2)
    private String endTime;

    private boolean isDelete;

    public static Playlist convertDtoToEntity(User user, ReqPlaylistDTO reqPlaylistDTO) {
        Playlist playlist = new Playlist();
        playlist.user = user;
        playlist.day = reqPlaylistDTO.getDay();
        playlist.djName = reqPlaylistDTO.getDjName();
        playlist.stationName = reqPlaylistDTO.getStationName();
        playlist.startTime = reqPlaylistDTO.getStartTime();
        playlist.endTime = reqPlaylistDTO.getEndTime();
        playlist.isDelete = false;
        return playlist;
    }
}