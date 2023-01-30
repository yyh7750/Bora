package com.ssafy.bora.repository.station;

import com.ssafy.bora.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStationRepository extends JpaRepository<Station, String> {

}