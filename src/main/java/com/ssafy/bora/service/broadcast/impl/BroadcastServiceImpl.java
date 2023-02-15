package com.ssafy.bora.service.broadcast.impl;

import com.ssafy.bora.dto.main.*;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.ViewLog;
import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.repository.broadcast.BroadcastRepositoryCustom;
import com.ssafy.bora.repository.broadcast.BroadcastRepositoryCustomImpl;
import com.ssafy.bora.repository.broadcast.IBroadcastRepository;
import com.ssafy.bora.repository.broadcast.ViewLogRepository;
import com.ssafy.bora.repository.follow.IFollowRepository;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.broadcast.IBroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BroadcastServiceImpl implements IBroadcastService {

    private final BroadcastRepositoryCustomImpl broadcastRepositoryCustomImpl;
    private final IBroadcastRepository broadcastRepository;
    private final IFollowRepository followRepository;
    private final IStationRepository stationRepository;
    private final IUserRepository userRepository;
    private final ViewLogRepository viewLogRepository;

    @Override
    public List<BasicMainDTO> findTopTenBroadcast() {
        List<BasicMainDTO>topTenList = new ArrayList<>();
        List<TopTenDTO>list = followRepository.countTopTen();
        for(TopTenDTO ttDto:list){
            Station station =stationRepository.findStationByDjId(ttDto.getDj_Id());
            BasicMainDTO bmDTO= BasicMainDTO.convertEntityToBasicMainDTO(station, ttDto);
            topTenList.add(bmDTO);
        }
        return topTenList;
    }

    @Override
    public List<MyFollowBroadcastDTO> findFollowBroadcast(String id) {
        List<MyFollowBroadcastDTO>mfbDtoList = new ArrayList<>();
        List<Follow>list =followRepository.findAllFollowingList(id);
        for(Follow follow :list){
            //내가 팔로우하는 방송국
            Station station = stationRepository.findStationByDjId(follow.getDj().getId());
            //방송중인 유저
            Broadcast broadcast = broadcastRepository.findByUserAndEndBroadIsNull(follow.getDj());
            boolean isLive= broadcast!=null;
            MyFollowBroadcastDTO mfbDTO = MyFollowBroadcastDTO.convertEntityToMyFollowBroadcastDTO(isLive,broadcast.getSessionId(),station);
            mfbDtoList.add(mfbDTO);
        }
        return mfbDtoList;
    }

    @Override
    public List<BroadcastResDTO> findAllLiveBroadcast(String category, List<String> mood, String sortBy) {
        SearchCondition searchCondition = new SearchCondition(category, mood);
        if(sortBy!=null&&sortBy.equals("recommend")){
            sortBy=null;
        }
        return broadcastRepository.findAllByCategoryAndSort(searchCondition,sortBy);
    }
    @Override
    public String createBroadcast(BroadcastReqDTO broadcastReqDTO) {
        User dj = userRepository.findById(broadcastReqDTO.getUserId()).get();
        Station station = dj.getStation();
        if(station==null) return null;

        Broadcast hasBroadcast=broadcastRepository.findByUserAndEndBroadIsNull(dj);
        if(hasBroadcast!=null) return null;

        String moodStr = String.join("",broadcastReqDTO.getMoods());

        Broadcast broadcast = Broadcast.builder()
                .user(dj)
                .broadcastImg(broadcastReqDTO.getImgUrl())
                .title(broadcastReqDTO.getTitle())
                .mood(moodStr)
                .startBroad(LocalDateTime.now())
                .endBroad(null)
                .sessionId(broadcastReqDTO.getSessionId())
                .build();
        broadcastRepository.save(broadcast);
        return broadcastReqDTO.getSessionId();
    }

    //TODO front는 세션만료를 이 과정 끝나고 해야한다는 것을 알려주기
    @Override
    public String removeBroadcast(BroadcastReqDTO broadcastReqDTO) {
        Broadcast broadcast = broadcastRepository.findBySessionIdAndEndBroadIsNull(broadcastReqDTO.getSessionId());
        Station station = stationRepository.findStationByDjId(broadcastReqDTO.getUserId());

        Duration startDuration= Duration.between(broadcast.getStartBroad(), station.getStartTime());
        Duration endDuration = Duration.between(LocalDateTime.now(), station.getEndTime());
        boolean isOnTime = Math.abs(startDuration.getSeconds())<300&&Math.abs(endDuration.getSeconds())<300;

        broadcast.deleteBroadcast(LocalDateTime.now(), broadcastReqDTO.getMaxViewer(), isOnTime);
        return broadcastReqDTO.getSessionId();
    }

    @Override
    public int createViewLog(List<ViewLogDTO> viewLogDTOList) {
        //viewLogDto에 세션ID받았고
        //viewlog에는 broadcast를 저장했다.
        List<ViewLog>logList = new ArrayList<>();
        for(ViewLogDTO viewLogDTO : viewLogDTOList) {
            User viewer = userRepository.findById(viewLogDTO.getViewerId()).get();
            Broadcast broadcast = broadcastRepository.findBySessionIdAndEndBroadIsNotNull(viewLogDTO.getSessionId());
            User dj = broadcast.getUser();
            //TODO 방송끝날때 다같이 보내는걸로 작성했음
            long airTime = Duration.between(broadcast.getEndBroad(), broadcast.getStartBroad()).getSeconds();
            long keepTime = Duration.between(viewLogDTO.getExit(), viewLogDTO.getEntrance()).getSeconds();
            ViewLog viewLog = ViewLog.convertDtoToEntity(viewer, dj, viewLogDTO, keepTime * 100 / airTime);
            logList.add(viewLog);
        }
        viewLogRepository.saveAll(logList);
        return logList.size();
    }
    public void recommendStation(){

    }

}
