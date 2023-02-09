package com.ssafy.bora.service.impl;

import com.ssafy.bora.dto.main.*;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.repository.broadcast.BroadcastRepositoryCustom;
import com.ssafy.bora.repository.broadcast.IBroadcastRepository;
import com.ssafy.bora.repository.follow.IFollowRepository;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.service.broadcast.IBroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BroadcastServiceImpl implements IBroadcastService {

    private IBroadcastRepository broadcastRepository;
    private IFollowRepository followRepository;
    private IStationRepository stationRepository;
    private BroadcastRepositoryCustom broadcastRepositoryCustom;

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
    public List<BroadcastDTO> findAllLiveBroadcast(String category, String[] mood, String sortBy) {
        SearchCondition searchCondition = new SearchCondition(category, mood[0],mood[1],mood[2],mood[3],mood[4],mood[5]);
        if(sortBy.equals("recommend")){
            sortBy=null;
        }
        return broadcastRepositoryCustom.findAllByCategoryAndSort(searchCondition,sortBy);
    }
}
