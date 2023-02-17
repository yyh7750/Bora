package com.ssafy.bora.repository.broadcast;

import com.ssafy.bora.dto.main.BroadcastResDTO;
import com.ssafy.bora.dto.main.SearchCondition;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BroadcastRepositoryCustom {
    List<BroadcastResDTO> findAllByCategoryAndSort(SearchCondition condition, String sortCondition);
}
