package com.ssafy.bora.service.station.impl;

import com.ssafy.bora.dto.StationDTO;
import com.ssafy.bora.service.station.IStationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StationServiceImpl implements IStationService {

    @Override
    public StationDTO createStation(StationDTO stationDTO) {
        return null;
    }

    @Override
    public StationDTO findStationByDjId(String djId) {
        return null;
    }

    @Override
    public int updateStationInfo(StationDTO stationDTO) {
        return 0;
    }

    @Override
    public int deleteStation(String djId) {
        return 0;
    }

    @Override
    public Boolean checkDuplicateStationName(String name) {
        return null;
    }
}
