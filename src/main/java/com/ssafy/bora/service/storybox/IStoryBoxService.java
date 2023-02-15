package com.ssafy.bora.service.storybox;

import com.ssafy.bora.dto.stroybox.ReqStoryBoxDTO;
import com.ssafy.bora.dto.stroybox.ResStoryBoxDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IStoryBoxService {

    // 사연함 등록 (dj, viewer 공통)
    ResStoryBoxDTO createStoryBox(ReqStoryBoxDTO reqStoryBoxDTO);

    /**
     * desc: 사연함 목록 조회 (dj)
     *
     * @param djId
     * @return
     */
    Page<ResStoryBoxDTO> findAllStoryBox(String djId, Pageable pageable);

    /**
     * desc: 사연함 상세 조회 (dj)
     *
     * @param djId
     * @param storyBoxId
     * @return
     */
    ResStoryBoxDTO findByDjIdAndStoryBoxId(String djId, int storyBoxId);

    // 사연함 단일 삭제 (공통)
    ResStoryBoxDTO deleteOneStoryBoxByDj(int storyBoxId);

    // 사연함 여러 개 삭제 (dj) - 보류 (데이터 받아오는게 확실해질 경우 진행)
    void deleteStoryBoxListByDj(List<Integer> storyBoxList);

    // 사연함 조회 (시청자)
    ResStoryBoxDTO findMyStoryBoxOfDj(String djId, String viewerId);

    // 사연함 수정 (시청자)
    ResStoryBoxDTO updateStoryBox(ReqStoryBoxDTO updateStoryBoxDTO);

    // 사연함 전체 삭제 (방송 끝나는 시점에 일괄처리)
    void deleteAllAtEndBroadcast(String djId);
}