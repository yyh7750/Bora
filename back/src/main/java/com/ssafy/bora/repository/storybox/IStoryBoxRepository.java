package com.ssafy.bora.repository.storybox;

import com.ssafy.bora.entity.StoryBox;
import com.ssafy.bora.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IStoryBoxRepository extends JpaRepository<StoryBox, Integer>{

    List<StoryBox> findByDjAndIsDeleteFalse(User dj);

    /**
     * desc : 시청자가 해당 DJ에게 이미 사연을 보냈는지 체크하는 메소드
     * @param viewerId
     * @return
     */
    StoryBox findByDjAndViewerIdAndIsDeleteFalse(User dj, String viewerId);

    /**
     * desc : 사연함 상세 조회
     * @param dj
     * @param storyBoxId
     */
    StoryBox findByDjAndIdAndIsDeleteFalse(User dj, int storyBoxId);

    Page<StoryBox> findByDjAndIsDeleteFalse(User dj, Pageable pageable);

    StoryBox findById(int storyBoxId);
}