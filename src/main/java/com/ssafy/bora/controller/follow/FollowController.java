package com.ssafy.bora.controller.follow;

import com.ssafy.bora.dto.follow.ReqFollowDTO;
import com.ssafy.bora.dto.follow.ResFollowDTO;
import com.ssafy.bora.entity.follow.RedisFollow;
import com.ssafy.bora.service.follow.IFollowService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowController {

    private final IFollowService followService;

    @ApiOperation(value = ",,,")
    @PostMapping
    public ResponseEntity<?> addFollow(@RequestBody List<ReqFollowDTO> reqFollowDtoList){
        int[][] result = followService.addFollow(reqFollowDtoList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팔로우/언팔로우")
    @PostMapping("/redis")
    public ResponseEntity<?> addFollowRedis(@RequestBody RedisFollow redisFollow){
        followService.checkReq(redisFollow);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "내가 팔로우한 사람 조회(내 팔로우)")
    @GetMapping("/dj/{viewer-id}")
    public ResponseEntity<?> findFollowingList(@PathVariable(value = "viewer-id") String viewerId){
        List<ResFollowDTO> followingList = followService.findAllFollowingList(viewerId);
        return new ResponseEntity<>(followingList, HttpStatus.OK);
    }

    @ApiOperation(value = "나를 팔로우한 사람 조회(내 팔로워)")
    @GetMapping("/viewer/{dj-id}")
    public ResponseEntity<?> findFollowerList(@PathVariable(value = "dj-id") String djId){
        List<ResFollowDTO> followerList = followService.findAllFollowerList(djId);
        return new ResponseEntity<>(followerList, HttpStatus.OK);
    }
}