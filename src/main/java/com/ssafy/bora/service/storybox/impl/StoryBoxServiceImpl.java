package com.ssafy.bora.service.storybox.impl;

import com.ssafy.bora.dto.stroybox.ReqStoryBoxDTO;
import com.ssafy.bora.dto.stroybox.ResStoryBoxDTO;
import com.ssafy.bora.service.storybox.IStoryBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StoryBoxServiceImpl implements IStoryBoxService {


    @Override
    public ResStoryBoxDTO createStoryBox(ReqStoryBoxDTO reqStoryBoxDTO) {
        return null;
    }

    @Override
    public List<ResStoryBoxDTO> findAllStoryBox(String djId) {
        return null;
    }

    @Override
    public ResStoryBoxDTO findByDjIdAndStoryBoxId(String djId, int storyBoxId) {
        return null;
    }
}