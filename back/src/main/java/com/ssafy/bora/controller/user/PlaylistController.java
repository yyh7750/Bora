package com.ssafy.bora.controller.user;

import com.ssafy.bora.dto.user.playlist.ReqPlaylistDTO;
import com.ssafy.bora.dto.user.playlist.ResPlaylistDTO;
import com.ssafy.bora.service.user.IPlaylistService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/playlist")
@RequiredArgsConstructor
public class PlaylistController {
    private final IPlaylistService playlistService;

    @ApiOperation(value = "방송 리스트 전체 조회")
    @GetMapping
    public ResponseEntity<?> getPlaylistAll() {
        List<ResPlaylistDTO> playlist = playlistService.getPlaylistAll();
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }

    @ApiOperation(value = "플레이 리스트 등록(수정 포함)")
    @PostMapping
    public ResponseEntity<?> createOrUpdatePlaylist(@RequestBody List<ReqPlaylistDTO> reqPlaylistDtoList) {
        int result = playlistService.createOrUpdatePlaylist(reqPlaylistDtoList);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "내 플레이 리스트 조회")
    @GetMapping("/{user-id}")
    public ResponseEntity<?> findMyPlaylist(@PathVariable(name = "user-id") String userId) {
        return new ResponseEntity<>(playlistService.findByUserId(userId), HttpStatus.OK);
    }
}