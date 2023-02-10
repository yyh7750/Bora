package com.ssafy.bora.controller.main;

import com.ssafy.bora.dto.main.BroadcastReqDTO;
import com.ssafy.bora.service.broadcast.IBroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainController {

    private final IBroadcastService broadcastService;

    //팔로워 수 탑텐
    @GetMapping("/top-ten")
    public ResponseEntity<?> findTopTen() {
        return new ResponseEntity<>(broadcastService.findTopTenBroadcast(), HttpStatus.OK);
    }
    //내가 팔로워한거
    @GetMapping("/follow-broad/{id}")
    public ResponseEntity<?> findFollowBroadcast(@PathVariable String userId){
        return new ResponseEntity<>(broadcastService.findFollowBroadcast(userId),HttpStatus.OK);
    }

    @GetMapping("/live-board/{category}")
    public ResponseEntity<?> findLiveBroadcast(@PathVariable(required = false) String category,
                                               @RequestParam(value="mood",required = false) List<String> mood,
                                               @RequestParam(value="sortBy",required = false) String sortBy) {
        return new ResponseEntity<>(broadcastService.findAllLiveBroadcast(category, mood, sortBy), HttpStatus.OK);
    }
    @PostMapping("/broadcast")
    public ResponseEntity<?> createBroadcast(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.createBroadcast(broadcastReqDTO),HttpStatus.CREATED);
    }
    @DeleteMapping("/broadcast")
    public ResponseEntity<?> updateBroadcast(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.removeBroadcast(broadcastReqDTO),HttpStatus.OK);
    }
    @PostMapping("/viewer")
    public ResponseEntity<?> createViewLog(@RequestBody BroadcastReqDTO broadcastReqDTO){
        return new ResponseEntity<>(broadcastService.removeBroadcast(broadcastReqDTO),HttpStatus.OK);
    }
}
