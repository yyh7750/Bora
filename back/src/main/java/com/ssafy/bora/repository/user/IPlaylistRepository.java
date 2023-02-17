package com.ssafy.bora.repository.user;

import com.ssafy.bora.entity.Playlist;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Transactional
public interface IPlaylistRepository extends JpaRepository<Playlist, User> {

    List<Playlist> findByUserIdAndIsDeleteFalse(String userId);

    @Modifying
    @Query(value = "update Playlist p set p.isDelete=true")
    void resetPlaylist();

    @Modifying
    @Query(nativeQuery = true,
            value = "insert into playlist " +
                    "(user_id, day, dj_name, station_name, start_time, end_time, is_delete)" +
                    "values (:userId, :day, :djName, :stationName, :startTime, :endTime, false)" +
                    "on duplicate key update is_delete = false")
    int createOrUpdatePlaylist(@Param("userId") String userId, @Param("day") String day,
                               @Param("djName") String djName, @Param("stationName") String stationName,
                               @Param("startTime") String startTime, @Param("endTime") String endTime);
}