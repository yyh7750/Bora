package com.ssafy.bora.service.station;

import com.ssafy.bora.dto.StationDTO;

public interface IStationService {

    StationDTO createStation(StationDTO stationDTO);

    StationDTO findStationByDjId(String djId);

    int updateStationInfo(StationDTO stationDTO);

    int deleteStation(String djId);

    Boolean checkDuplicateStationName(String name);
}