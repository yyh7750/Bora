package com.ssafy.bora.controller.user;

import com.ssafy.bora.dto.BlacklistDTO;
import com.ssafy.bora.dto.UserDTO;
import com.ssafy.bora.entity.Blacklist;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.repository.user.IBlacklistRepository;
import com.ssafy.bora.service.user.IBlacklistService;
import com.ssafy.bora.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final IBlacklistService blacklistService;
    private final IUserService userService;

    // * start user info controller

    @GetMapping("/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable String id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<?> updateUserById(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.updateUserById(userDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable String id) {
        return new ResponseEntity<>(userService.deleteUserById(id), HttpStatus.OK);
    }


    // * end user info controller

    // =================================================

    // * start blacklist controller

    @PostMapping("/blacklist")
    public ResponseEntity<?> registBlackList(@RequestBody BlacklistDTO blacklist) {
        return new ResponseEntity<>(blacklistService.registBlacklist(blacklist), HttpStatus.CREATED);
    }

    @GetMapping("/blacklist/{id}")
    public ResponseEntity<?> findAllBlackList(@PathVariable String id) {
        return new ResponseEntity<>(blacklistService.findAllBlacklist(id), HttpStatus.OK);
    }

    @DeleteMapping("/blacklist{id}")
    public ResponseEntity<?> deleteBlacklist(@RequestBody BlacklistDTO blacklistDTO) {
        return null;
    }

    // * end blacklist controller

    // =================================================
}