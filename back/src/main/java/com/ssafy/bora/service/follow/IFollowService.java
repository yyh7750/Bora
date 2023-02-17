package com.ssafy.bora.service.follow;

import com.ssafy.bora.dto.follow.ResFollowDTO;
import com.ssafy.bora.entity.follow.RedisFollow;

import java.util.List;

public interface IFollowService {

    /**
     * desc: 팔로우 추가 또는 취소 상태를 추가 상태로 업데이트하는 메소드.
     * jdbcTemplate의 batchUpdate를 이용한 batch insert 전략 사용
     * 
     * @param resFollowDtoList
     * @return
     */
    int[][] addFollow(List<ResFollowDTO> resFollowDtoList);

    /**
     * desc: req 값이 follow, unfollow 인지 판단하여
     * save할지 delete할지 결정하는 메소드.
     *
     * @param redisFollow
     */
    void checkReq(RedisFollow redisFollow);

    /**
     * desc: 받아온 데이터를 redis에 넣기 위한 메소드.
     * redis에 쌓아놓고 스케줄링 메소드에 의해 rdb에 batch insert
     *
     * @param redisFollow
     * @return
     */
    void addRedisFollow(RedisFollow redisFollow);

    /**
     * desc : 스케줄링에 필요한 메소드.
     *
     * 일정 스케줄링에 따라 자동으로 실행되는 메소드.
     * cron = "0 0 0 * * *" -> 매일 자정마다 실행
     */
    void sendRedisDataToAddFollow();

    /**
     * desc: 내가 팔로우한 DJ 목록 조회
     *
     * @param viewerId : viewer = 나(자신)
     * @return
     */
    List<ResFollowDTO> findAllFollowingList(String viewerId);

    /**
     * desc: redis에서 keyPattern에 해당하는 목록을 조회하여 List로 반환받기 위한 메소드
     *
     * @param keyPattern
     * @return
     */
    List<ResFollowDTO> getFollowDTOList(String keyPattern);

    /**
     * desc: 나(Dj)를 팔로우한 시청자 목록 조회
     * 
     * @param djId
     * @return
     */
    List<ResFollowDTO> findAllFollowerList(String djId);

    /**
     * desc: 나를 팔로우한 사람들 수 조회
     *
     * @param djId
     * @return
     */
    int findAllFollowerCnt(String djId);
}