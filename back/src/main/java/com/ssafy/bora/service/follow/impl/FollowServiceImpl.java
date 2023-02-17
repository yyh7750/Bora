package com.ssafy.bora.service.follow.impl;

import com.ssafy.bora.dto.follow.ResFollowDTO;
import com.ssafy.bora.dto.main.TopTenDTO;
import com.ssafy.bora.entity.BroadcastOrder;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.entity.follow.RedisFollow;
import com.ssafy.bora.repository.broadcast.BroadcastOrderRepository;
import com.ssafy.bora.repository.follow.IFollowRepository;
import com.ssafy.bora.repository.follow.IRedisFollowRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.follow.IFollowService;
import lombok.RequiredArgsConstructor;
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
    private final IUserRepository userRepository;

    @Override
    public int[][] addFollow(List<ResFollowDTO> resFollowDtoList) {

        List<TopTenDTO>orderList = followRepository.sortConditon();

        jdbcTemplate.batchUpdate("insert into broadcast_order (user_id, cnt) values(?,?) on duplicate key update user_id=values(user_id),cnt=values(cnt);",
                orderList,
                orderList.size(),
                new ParameterizedPreparedStatementSetter<TopTenDTO>() {
                    @Override
                    public void setValues(PreparedStatement ps, TopTenDTO bo) throws SQLException {
                        ps.setString(1, bo.getDj_Id());
                        ps.setLong(2, bo.getFollowCnt());

                    }
                });
        return jdbcTemplate.batchUpdate(
                "insert into follow " +
                        "(dj_id, viewer_id, is_delete) " +
                        "values (?, ?, 0) " +
                        "ON DUPLICATE KEY UPDATE is_delete = 0;",
                resFollowDtoList,
                resFollowDtoList.size(),
                new ParameterizedPreparedStatementSetter<ResFollowDTO>() {
                    @Override
                    public void setValues(PreparedStatement ps, ResFollowDTO resFollowDTO) throws SQLException {
                        ps.setString(1, resFollowDTO.getDjNickName());
                        ps.setString(2, resFollowDTO.getViewerNickName());
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
        keyBuilder.append("following:").append(redisFollow.getDjId()).append("+").append(redisFollow.getViewerId());
        redisTemplate.opsForValue().set(keyBuilder.toString(), redisFollow);
    }

    @Override
    @Async
    @Scheduled(cron = "0 0 0 * * *")
    public void sendRedisDataToAddFollow() {

        // redis에서 값을 RDB에 옮겨준다.
        List<ResFollowDTO> redisFollowList = getFollowDTOList("following:*");
        if (!redisFollowList.isEmpty()) {
            addFollow(redisFollowList);
        }

        // redis 비우기
        redisTemplate.delete("following:*");

        // redis rdb 값으로 채우기
        List<Follow> followList = followRepository.findAllByIsDeleteFalse();

        for (Follow follow : followList) {
            StringBuilder key = new StringBuilder();
            key.append("following:").append(follow.getDj().getId()).append("+").append(follow.getViewer().getId());
            redisTemplate.opsForValue().set(key.toString(), RedisFollow.convertRdbToRedis(key.toString(), follow));
        }
    }

    @Override
    public List<ResFollowDTO> findAllFollowingList(String viewerId) {

        // Redis에서 key 목록 가져오기
        StringBuilder keyBuilder = new StringBuilder();
        keyBuilder.append("*+").append(viewerId);

        List<ResFollowDTO> resFollowDTOList = getFollowDTOList(keyBuilder.toString());

        return resFollowDTOList;
    }

    @Override
    public List<ResFollowDTO> findAllFollowerList(String djId) {

        // Redis에서 key 목록 가져오기
        StringBuilder keyBuilder = new StringBuilder();
        keyBuilder.append("following:").append(djId).append("+*");

        List<ResFollowDTO> resFollowDTOList = getFollowDTOList(keyBuilder.toString());

        return resFollowDTOList;
    }

    @Override
    public List<ResFollowDTO> getFollowDTOList(String keyPattern) {

        Set<String> keySet = redisTemplate.keys(keyPattern);
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
            String djNickName = userRepository.findById(redisFollow.getDjId()).get().getNickName();
            String viewerNickName = userRepository.findById(redisFollow.getViewerId()).get().getNickName();
            resFollowDTOList.add(ResFollowDTO.addDTO(djNickName, viewerNickName));
        }

        return resFollowDTOList;
    }

    @Override
    public int findAllFollowerCnt(String djId) {
        // Redis에서 key 목록 가져오기
        StringBuilder keyBuilder = new StringBuilder();
        keyBuilder.append("*+").append(djId);
        Set<String> keySet = redisTemplate.keys(keyBuilder.toString());
        return keySet.size();
    }
}