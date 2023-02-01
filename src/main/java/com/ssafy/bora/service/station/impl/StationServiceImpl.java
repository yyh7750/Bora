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

        // 요청받은 DTO 정보를 Entity에 추가
        Station station = new Station();
        station.convertDtoToStation(dj, stationDTO);

        // 방송국 status 변경 및 save
        dj.createStation();
        Station registeredStation = stationRepository.save(station);

        StationDTO registeredStationDTO = new StationDTO();
        registeredStationDTO.convertStationToDTO(registeredStation);

        return registeredStationDTO;
    }

    @Override
    public StationDTO findStationByDjId(String djId) {
        Station findStation = stationRepository.findStationByDjId(djId);
        StationDTO findStationDTO = new StationDTO();
        findStationDTO.convertStationToDTO(findStation);
        return findStationDTO;
    }

    @Override
    public StationDTO updateStationInfo(StationDTO stationDTO) {
        String djId = stationDTO.getUserId();
        Station station = stationRepository.findStationByDjId(djId);

        station.convertDtoToStation(station.getUser(), stationDTO);

        StationDTO newStationDTO = new StationDTO();
        newStationDTO.convertStationToDTO(station);
        return newStationDTO;
    }

    // 로직에는 있지만 실제 기능에선 사용하지 않는 메소드
    @Override
    public Boolean deleteStation(String djId) {
        User dj = userRepository.findById(djId).get();
        dj.deleteStation();

        // 삭제 완료 됐다면 true 반환
        return !dj.isStatus();
    }

    @Override
    public Boolean checkDuplicateStationName(String name) {
        Station findStation = stationRepository.findByName(name);
        if (findStation != null) {
            return false;
        }
        return true;
    }
}