package com.ssafy.bora.entity.follow;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@RedisHash("follow")
public class RedisFollow implements Serializable {

    // 요청으로 id 값을 'djId+viewerId'로 받는다.
    @Id
    private String id;

    private String req;

    private String djId;

    private String viewerId;

    public static RedisFollow convertRdbToRedis(String key, Follow follow) {
        RedisFollow redisFollow = new RedisFollow();
        redisFollow.id = key;
        redisFollow.req = "follow";
        redisFollow.djId = follow.getDj().getId();
        redisFollow.viewerId = follow.getViewer().getId();
        return redisFollow;
    }
}