package com.ssafy.bora.service.follow.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bora.dto.follow.ReqFollowDTO;
import com.ssafy.bora.dto.follow.ResFollowDTO;
import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.entity.follow.RedisFollow;
import com.ssafy.bora.repository.follow.IFollowRepository;
import com.ssafy.bora.repository.follow.IRedisFollowRepository;
import com.ssafy.bora.service.follow.IFollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements IFollowService {

    private final JdbcTemplate jdbcTemplate;
    private final IFollowRepository followRepository;
    private final IRedisFollowRepository redisFollowRepository;
    private final RedisTemplate redisTemplate;

    @Override
    public int[][] addFollow(List<ReqFollowDTO> reqFollowDtoList) {
        return jdbcTemplate.batchUpdate(
                "insert into follow " +
                        "(dj_id, viewer_id, is_delete) " +
                        "values (?, ?, 0) " +
                        "ON DUPLICATE KEY UPDATE is_delete = 0;",
                reqFollowDtoList,
                reqFollowDtoList.size(),
                new ParameterizedPreparedStatementSetter<ReqFollowDTO>() {
                    @Override
                    public void setValues(PreparedStatement ps, ReqFollowDTO reqFollowDTO) throws SQLException {
                        ps.setString(1, reqFollowDTO.getDjId());
                        ps.setString(2, reqFollowDTO.getViewerId());
                    }
                }
        );
    }

    @Override
    public void checkReq(RedisFollow redisFollow) {
        // 구독(팔로우) 버튼을 누른 경우
        if (redisFollow.getReq().equals("follow")) {
            addRedisFollow(redisFollow);
        }
        // 구독 취소(언팔로우) 버튼을 누른 경우
        else {
            String key = redisFollow.getId();
            String djId = redisFollow.getDjId();
            String viewerId = redisFollow.getViewerId();

            /**
             * redis에 해당 데이터가 있는지 먼저 확인
             * 없다면 rdb의 상태값 변경,
             * 있다면 redis에서 삭제하는 메소드 호출.
             */
            RedisFollow findRedisData = redisFollowRepository.findById(key).orElse(null);

            if (findRedisData == null) {
                followRepository.updateByDjAndViewer(djId, viewerId);
                return;
            }

            redisFollowRepository.deleteById(redisFollow.getId());
        }
    }

    @Override
    public void addRedisFollow(RedisFollow redisFollow) {
        StringBuilder keyBuilder = new StringBuilder();
        keyBuilder.append("follow:").append(redisFollow.getDjId()).append("+").append(redisFollow.getViewerId());
        redisTemplate.opsForValue().set(keyBuilder.toString(), redisFollow);
    }

    @Override
    @Async
//    @Scheduled(cron = "0 0 0 * * *")
    public void sendRedisDataToAddFollow() {
        List<ReqFollowDTO> redisFollowList = new ArrayList<>();
        Iterable<RedisFollow> iterable = redisFollowRepository.findAll();
        Set<String> followKeys = redisTemplate.keys("follow:*");

        while (iterable.iterator().hasNext()) {
            redisFollowList.add(ReqFollowDTO.convertRedisDataToDTO(iterable.iterator().next()));
        }

        if (redisFollowList.size() > 0) {
            addFollow(redisFollowList);
        }

        for (String key : followKeys) {
            redisTemplate.delete(key);
        }
    }

    @Override
    public List<ResFollowDTO> findAllFollowingList(String viewerId) {

        // Redis에서 key 목록 가져오기
        StringBuilder keyBuilder = new StringBuilder();
        keyBuilder.append("*+").append(viewerId);
        Set<String> keySet = redisTemplate.keys(keyBuilder.toString());
        Iterator<String> keyIter = keySet.iterator();

        // RedisFollow Entity List 생성
        ValueOperations valueOperations = redisTemplate.opsForValue();
        List<RedisFollow> redisFollowList = new ArrayList<>();
        while (keyIter.hasNext()) {
            String key = keyIter.next();
            RedisFollow redisFollow = (RedisFollow) valueOperations.get(key);
            redisFollowList.add(redisFollow);
        }

        // 리턴할 리스트 생성 및 값 초기화
        List<ResFollowDTO> resFollowDTOList = new ArrayList<>();
        for (RedisFollow redisFollow : redisFollowList) {
            String djNickName = redisFollow.getDjId();
            String viewerNickName = redisFollow.getViewerId();
            resFollowDTOList.add(ResFollowDTO.addDTO(djNickName, viewerNickName));
        }

//        List<Follow> followingList = followRepository.findAllFollowingList(viewerId);
//        List<ResFollowDTO> resFollowingList = new ArrayList<>();
//
//        for (Follow followingInfo : followingList) {
//            String djNickName = followingInfo.getDj().getNickName();
//            String viewerNickName = followingInfo.getViewer().getNickName();
//            resFollowingList.add(ResFollowDTO.addDTO(djNickName, viewerNickName));
//        }
//        return resFollowingList;
        return resFollowDTOList;
    }

    @Override
    @Cacheable(value = "follower", key = "#djId", cacheManager = "cacheManager")
    public List<ResFollowDTO> findAllFollowerList(String djId) {
        List<Follow> followerList = followRepository.findAllFollowerList(djId);
        List<ResFollowDTO> resFollowingList = new ArrayList<>();

        for (Follow followingInfo : followerList) {
            String djNickName = followingInfo.getDj().getNickName();
            String viewerNickName = followingInfo.getViewer().getNickName();
            resFollowingList.add(ResFollowDTO.addDTO(djNickName, viewerNickName));
        }
        return resFollowingList;
    }
}