package com.ssafy.bora.repository.station;

import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IStationRepository extends JpaRepository<Station, User> {

    @Query(value = "select s from Station s where s.id=:djId")
    Optional<Station> findStationByDjId(@Param("djId") String djId);

    Optional<Station> findByName(String name);

    /**
     * desc: playlist에서 사용하는 메소드
     * @return
     */
    List<Station> findAllByIsDeleteFalse();
}