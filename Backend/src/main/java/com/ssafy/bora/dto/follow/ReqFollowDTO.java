package com.ssafy.bora.dto.follow;

import com.ssafy.bora.entity.follow.Follow;
import com.ssafy.bora.entity.follow.RedisFollow;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqFollowDTO {

    private String djId;

    private String viewerId;

    public static ReqFollowDTO convertRedisDataToDTO(RedisFollow redisFollow) {
        ReqFollowDTO reqFollowDTO = new ReqFollowDTO();
        reqFollowDTO.djId = redisFollow.getDjId();
        reqFollowDTO.viewerId = redisFollow.getViewerId();
        return reqFollowDTO;
    }

    public static ReqFollowDTO convertEntityToDTO(Follow follow) {
        ReqFollowDTO reqFollowDTO = new ReqFollowDTO();
        reqFollowDTO.djId = follow.getDj().getNickName();
        reqFollowDTO.viewerId = follow.getViewer().getNickName();
        return reqFollowDTO;
    }
}