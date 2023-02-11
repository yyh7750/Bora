package com.ssafy.bora.service.broadcast;

import com.ssafy.bora.dto.main.*;

import java.util.List;

public interface IBroadcastService {
    List<BasicMainDTO> findTopTenBroadcast();
    List<BroadcastResDTO> findAllLiveBroadcast(String category, List<String> mood, String sortBy);
    List<MyFollowBroadcastDTO> findFollowBroadcast(String id);
    String createBroadcast(BroadcastReqDTO broadcastReqDTO);
    String removeBroadcast(BroadcastReqDTO broadcastReqDTO);
    int createViewLog(List<ViewLogDTO> viewLogDTOList);


}
