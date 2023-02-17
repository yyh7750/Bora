package com.ssafy.bora.repository.follow;

import com.ssafy.bora.entity.follow.RedisFollow;
import org.springframework.data.repository.CrudRepository;

public interface IRedisFollowRepository extends CrudRepository<RedisFollow, String> {

}