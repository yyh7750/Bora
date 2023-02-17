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

    @PatchMapping
    public ResponseEntity<?> updateUserInfo(@RequestBody SignUpDTO signUpDTO){ // 업데이트 해야할 사용자 정보
        userService.createUserInfo(signUpDTO);
        return new ResponseEntity<>(HttpStatus.CREATED); // 리소스가 성공적으로 생성되었음을 나타냄
    }


    @GetMapping("/{nick-name}")
    public ResponseEntity<?> checkDuplicateNickName(@PathVariable(name = "nick-name") String nickName){
        return new ResponseEntity<>(userService.checkDuplicateNickName(nickName), HttpStatus.OK);
    }
}