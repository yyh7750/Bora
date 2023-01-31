package com.ssafy.bora.repository.station;

import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IStationRepository extends JpaRepository<Station, User> {

    @Query(value = "select s from Station s where s.id=:djId")
    Station findStationByDjId(@Param("djId") String djId);
}