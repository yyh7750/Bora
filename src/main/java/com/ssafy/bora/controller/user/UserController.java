package com.ssafy.bora.controller.user;

import com.ssafy.bora.dto.blacklist.ReqBlacklistDTO;
import com.ssafy.bora.dto.user.UserDTO;
import com.ssafy.bora.service.user.IBlacklistService;
import com.ssafy.bora.service.user.IUserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final IBlacklistService blacklistService;
    private final IUserService userService;

    // * start user info controller

    @ApiOperation(value = "프로필 정보 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable String id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 정보 수정")
    @PatchMapping
    public ResponseEntity<?> updateUserById(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.updateUserNickNameById(userDTO), HttpStatus.OK);
    }

    @ApiOperation(value = "회원탈퇴")

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable String id) {
        return new ResponseEntity<>(userService.deleteUserById(id), HttpStatus.OK);
    }


    // * end user info controller

    // =================================================

    // * start blacklist controller

    @ApiOperation(value = "블랙리스트 등록")

    @PostMapping("/blacklist")
    public ResponseEntity<?> registBlackList(@RequestBody ReqBlacklistDTO blacklist) {
        return new ResponseEntity<>(blacklistService.registBlacklist(blacklist), HttpStatus.CREATED);
    }
    @ApiOperation(value = "블랙리스트 조회")

    @GetMapping("/blacklist/{id}")
    public ResponseEntity<?> findAllBlackList(@PathVariable String id) {
        return new ResponseEntity<>(blacklistService.findAllBlacklist(id), HttpStatus.OK);
    }

    @ApiOperation(value = "블랙리스트 삭제")

    @DeleteMapping("/blacklist")
    public ResponseEntity<?> deleteBlacklist(@RequestBody ReqBlacklistDTO reqBlacklistDTO) {
        int result = blacklistService.deleteBlacklist(reqBlacklistDTO);
        if (result > 0) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // * end blacklist controller

    // =================================================
}