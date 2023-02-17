package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.user.playlist.ReqPlaylistDTO;
import com.ssafy.bora.dto.user.playlist.ResPlaylistDTO;
import com.ssafy.bora.entity.Playlist;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.repository.user.IPlaylistRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.user.IPlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlaylistServiceImpl implements IPlaylistService {

    private final IPlaylistRepository playlistRepository;
    private final IUserRepository userRepository;
    private final IStationRepository stationRepository;

    /**
     * 일단 로직에만 존재함.
     * 시간표 클릭을 했을 때 해당 시간에 포함되는 방송 정보 리스트를 리턴해주는 메소드.
     * 시간 남으면 구현할 예정.
     *
     * @return
     */
    @Override
    public List<ResPlaylistDTO> getPlaylistOnTime() {
        return null;
    }

    @Override
    public List<ResPlaylistDTO> getPlaylistAll() {
        List<Station> stationList = stationRepository.findAllByIsDeleteFalse();

        List<ResPlaylistDTO> resPlaylistDTOs = new ArrayList<>();
        if (!stationList.isEmpty() && stationList != null) {
            for (Station stationInfo : stationList) {
                resPlaylistDTOs.add(ResPlaylistDTO.convertStationToDTO(stationInfo));
            }
        }

        if (!resPlaylistDTOs.isEmpty() && resPlaylistDTOs != null) {
            return resPlaylistDTOs;
        }
        return null;
    }

    @Override
    public int createOrUpdatePlaylist(List<ReqPlaylistDTO> reqPlaylistDTOs) {
        playlistRepository.resetPlaylist();

        int result = 0;
        for (ReqPlaylistDTO reqPlaylistDTO : reqPlaylistDTOs) {

            User user = userRepository.findById(reqPlaylistDTO.getUserId()).get();
            Playlist playlist = Playlist.convertDtoToEntity(user, reqPlaylistDTO);
            result = playlistRepository.createOrUpdatePlaylist(
                    user.getId(), playlist.getDay(), playlist.getDjName(),
                    playlist.getStationName(), playlist.getStartTime(),
                    playlist.getEndTime());
            if (result == 0) {
                return result;
            }
        }
        return result;
    }

    @Override
    public List<ResPlaylistDTO> findByUserId(String userId) {

        List<Playlist> userPlaylist = playlistRepository.findByUserIdAndIsDeleteFalse(userId);

        List<ResPlaylistDTO> resUserPlaylist = new ArrayList<>();
        for (Playlist playlist : userPlaylist) {
            resUserPlaylist.add(ResPlaylistDTO.convertPlaylistToDTO(playlist));
        }

        return resUserPlaylist;
    }
}