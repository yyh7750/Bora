package com.ssafy.bora.service.broadcast.impl;

import com.ssafy.bora.dto.main.*;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.ViewLog;
import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.repository.broadcast.BroadcastRepositoryCustom;
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
            Station station =stationRepository.findStationByDjId(ttDto.getUserId());
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
            MyFollowBroadcastDTO mfbDTO = MyFollowBroadcastDTO.convertEntityToMyFollowBroadcastDTO(isLive,station);
            mfbDtoList.add(mfbDTO);
        }
        return mfbDtoList;
    }

    @Override
    public List<BroadcastResDTO> findAllLiveBroadcast(String category, List<String> mood, String sortBy) {
        SearchCondition searchCondition = new SearchCondition(category, mood);
        if(sortBy.equals("recommend")){
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
        Broadcast broadcast = broadcastRepository.findBySessionId(broadcastReqDTO.getSessionId());
        Station station = stationRepository.findStationByDjId(broadcastReqDTO.getUserId());

        Duration startDuration= Duration.between(broadcast.getStartBroad(), station.getStartTime());
        Duration endDuration = Duration.between(broadcast.getEndBroad(), station.getEndTime());
        boolean isOnTime = startDuration.getSeconds()<300&&endDuration.getSeconds()<300;

        broadcast.deleteBroadcast(LocalDateTime.now(), broadcastReqDTO.getMaxViewer(), isOnTime);
        return broadcastReqDTO.getSessionId();
    }

    @Override
    public void createViewLog(ViewLogDTO viewLogDTO) {

    }
//    @Override
//    public void createViewLog(ViewLogDTO viewLogDTO) {
//        //viewLogDto에 세션ID받았고
//        //viewlog에는 broadcast를 저장했다.
//        User viewer = userRepository.findById(viewLogDTO.getViewerId()).get();
//        Broadcast broadcast = broadcastRepository.findBySessionId(viewLogDTO.getSessionId());
//        User dj = broadcast.getUser();
//        //방송끝날때 다같이 보내면 안되나?
//        List<AirtimeDTO>airtimeDTOList = broadcastRepository.findByStartDate(viewLogDTO.getEntrance());
//        long airTime=0;
//        for(AirtimeDTO airtimeDTO:airtimeDTOList){
//            airTime += Duration.between(airtimeDTO.getStartTime(),airtimeDTO.getEndTime()).getSeconds();
//        }
//        long keepTime=Duration.between(viewLogDTO.getEntrance(),viewLogDTO.getExit()).getSeconds();
//        ViewLog viewLog = ViewLog.convertDtoToEntity(viewer,dj,viewLogDTO,keepTime/airTime);
//        viewLogRepository.save(viewLog);
//    }

}
