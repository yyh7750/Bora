package com.ssafy.bora.service.station.impl;

import com.ssafy.bora.dto.user.StationDTO;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.station.IStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

        // 실질적인 데이터는 삭제되는게 아니라 상태값을 변경하여 관리하기 때문에
        // User의 status로 방송국을 그 전에 가지고 있었다가 삭제했었는지를 판단해야한다.
        if (dj.isStatus() == false) {

            // 요청받은 DTO 정보를 Entity로 변환
            Station station = Station.convertDtoToStation(dj, stationDTO);

            // 유저가 그 전에 방송국을 생성 했다가 삭제했을 경우
            if (dj.getStation() != null) {
                // 이미 방송국 정보를 가지고 있었다면 (방송국을 생성했었다가 삭제한 경우)
                // 이전 정보를 불러와 업데이트 해주기 위해 먼저 조회한다.
                // 덮어쓰기 위해 한번 더 정의해준다.
                Optional<Station> updateStation = stationRepository.findStationByDjId(dj.getId());
                if (updateStation.isPresent()) {
                    updateStation.get().changeStation(station);
                    // 다시 상태값을 true로 바꿔주고 덮어쓴다.
                    dj.createStation();
                    updateStation.get().createStation();
                    StationDTO registeredStationDTO = StationDTO.convertStationToDTO(updateStation.get());
                    return registeredStationDTO;
                }
                return null;
            }
            // user status 및 방송국 생성상태 변경 및 save
            // 방송국 생성 상태 변경
            dj.createStation();
            station.createStation();
            Station registeredStation = stationRepository.save(station);
            // DTO로 변환
            StationDTO registeredStationDTO = StationDTO.convertStationToDTO(registeredStation);
            return registeredStationDTO;
        }

        return null;
    }

    @Override
    public StationDTO findStationByDjId(String djId) {
        Optional<Station> findStation = stationRepository.findStationByDjId(djId);
        if (findStation.isPresent()) {
            StationDTO findStationDTO = StationDTO.convertStationToDTO(findStation.get());
            return findStationDTO;
        }
        return null;
    }

    @Override
    public StationDTO updateStationInfo(StationDTO stationDTO) {
        String djId = stationDTO.getUserId();
        Optional<Station> oldStation = stationRepository.findStationByDjId(djId);

        if (oldStation.isPresent()) {
            // 업데이트 실행
            Station newStation = Station.convertDtoToStation(oldStation.get().getUser(), stationDTO);
            oldStation.get().changeStation(newStation);

            // 업데이트 된 엔티티를 DTO로 변환하여 반환
            StationDTO newStationDTO = StationDTO.convertStationToDTO(oldStation.get());
            return newStationDTO;
        }
        return null;
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
        Optional<Station> findStation = stationRepository.findByName(name);
        if (findStation.isPresent()) {
            return false;
        }
        return true;
    }
}