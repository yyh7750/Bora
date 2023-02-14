package com.ssafy.bora.controller.main;

import com.ssafy.bora.dto.main.BroadcastReqDTO;
import com.ssafy.bora.service.broadcast.IBroadcastService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/main")
public class MainController {

    private final IBroadcastService broadcastService;

    @ApiOperation(value = "메인 / TOPTEN")
    @GetMapping("/top-ten")
    public ResponseEntity<?> findTopTen() {
        return new ResponseEntity<>(broadcastService.findTopTenBroadcast(), HttpStatus.OK);
    }

    @ApiOperation(value = "메인 / 내가 팔로우한 방송들)")
    @GetMapping("/follow-broad/{userId}")
    public ResponseEntity<?> findFollowBroadcast(@PathVariable String userId){
        return new ResponseEntity<>(broadcastService.findFollowBroadcast(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "메인 / 방송중인 방송들")
    @GetMapping("/live-broad")
    public ResponseEntity<?> findLiveBroadcast(@RequestParam(value="category",required = false) String category,
                                               @RequestParam(value="mood",required = false) List<String> mood,
                                               @RequestParam(value="sortBy",required = false) String sortBy) {
        return new ResponseEntity<>(broadcastService.findAllLiveBroadcast(category, mood, sortBy), HttpStatus.OK);
    }
    @ApiOperation(value = "방송 시작 버튼 보내줘야함")
    @PostMapping("/broadcast")
    public ResponseEntity<?> createBroadcast(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.createBroadcast(broadcastReqDTO),HttpStatus.CREATED);
    }
    @ApiOperation(value = "방송 종료 버튼 보내줘야함")
    @DeleteMapping("/broadcast")
    public ResponseEntity<?> updateBroadcast(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.removeBroadcast(broadcastReqDTO),HttpStatus.OK);
    }

    //TODO 방송 종료 후(/broadcast)->세션 or redis에 저장되어있던 값들 보내기(/viewer)
    @ApiOperation(value = "시청자 viewlog 저장")
    @PostMapping("/viewer")
    public ResponseEntity<?> createViewLog(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.removeBroadcast(broadcastReqDTO),HttpStatus.OK);
    }
}
