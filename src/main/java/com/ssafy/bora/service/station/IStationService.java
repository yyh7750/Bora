package com.ssafy.bora.service.station;

import com.ssafy.bora.dto.user.StationDTO;

public interface IStationService {

    StationDTO createStation(StationDTO stationDTO);

    StationDTO findStationByDjId(String djId);

    StationDTO updateStationInfo(StationDTO stationDTO);

    Boolean deleteStation(String djId);

    Boolean checkDuplicateStationName(String name);
}