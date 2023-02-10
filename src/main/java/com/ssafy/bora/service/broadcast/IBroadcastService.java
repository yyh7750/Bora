package com.ssafy.bora.service.broadcast;

import com.ssafy.bora.dto.main.BasicMainDTO;
import com.ssafy.bora.dto.main.BroadcastDTO;
import com.ssafy.bora.dto.main.MyFollowBroadcastDTO;
import com.ssafy.bora.dto.main.SearchCondition;

import java.util.List;

public interface IBroadcastService {
    List<BasicMainDTO> findTopTenBroadcast();
    List<BroadcastDTO> findAllLiveBroadcast(String category, List<String> mood, String sortBy);
    List<MyFollowBroadcastDTO> findFollowBroadcast(String id);



}
