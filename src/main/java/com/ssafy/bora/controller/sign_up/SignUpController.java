package com.ssafy.bora.controller.sign_up;

import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.ssafy.bora.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sign-up")
@RequiredArgsConstructor
public class SignUpController {

    private final IUserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody SignUpDTO signUpDTO){
        return new ResponseEntity<>(userService.createUser(signUpDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{nick-name}")
    public ResponseEntity<?> checkDuplicateNickName(@PathVariable(name = "nick-name") String nickName){
        return new ResponseEntity<>(userService.checkDuplicateNickName(nickName), HttpStatus.OK);
    }
}