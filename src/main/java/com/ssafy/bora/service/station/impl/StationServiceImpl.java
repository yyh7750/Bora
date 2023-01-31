package com.ssafy.bora.service.station.impl;

import com.ssafy.bora.dto.StationDTO;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.station.IStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StationServiceImpl implements IStationService {

    private final IUserRepository userRepository;
    private final IStationRepository stationRepository;

    @Override
    public StationDTO createStation(StationDTO stationDTO) {
        // Station Entity에 들어갈 방송국을 개설하는 Dj 정보
        User dj = userRepository.findById(stationDTO.getUserId()).get();
        Station station = new Station().convertStationDtoToEntity(dj, stationDTO);
        Station registedStation = stationRepository.save(station);
        return new StationDTO().convertStationEntityToDTO(registedStation);
    }

    @Override
    public StationDTO findStationByDjId(String djId) {
        Station findStation = stationRepository.findStationByDjId(djId);
        return new StationDTO().convertStationEntityToDTO(findStation);
    }

    @Override
    public int updateStationInfo(StationDTO stationDTO) {
        String djId = stationDTO.getUserId();
        Station oldStation = stationRepository.findStationByDjId(djId);
        oldStation.updateStation(stationDTO);
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
