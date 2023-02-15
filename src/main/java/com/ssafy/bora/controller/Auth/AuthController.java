package com.ssafy.bora.controller.Auth;

import com.ssafy.bora.service.auth.AuthService;
import com.ssafy.bora.util.CookieUtils;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.bora.dto.user.UserExtraInfoReq;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController //json 형태로 반환을 위해서
@RequestMapping("/auth") // 각각의 value를 설정 안하기위해
@RequiredArgsConstructor // Lombok, 생성자 주입을 임의 설정
@Slf4j//Simple Logging Facade for Java
public class AuthController {
    // 생성자 주입
    private final AuthService authService;

    @ApiOperation(value = "토큰 재발급")
    @GetMapping //토큰 재발급 메서드
    public String reissueAccessToken(HttpServletRequest request, @RequestHeader("Authorization") String oldAccessToken) {
        oldAccessToken = oldAccessToken.substring(7); // 헤더부분(토큰 정보)
        log.info("oldAccessToken: {}", oldAccessToken); // 출력해보기
        // 리프레쉬 토큰을 쿠키 유틸에서 빼서 저장
        String refreshToken = CookieUtils.getCookie(request, "refresh")
                //만약 없으면 예외 처리
                .orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
                // 있으면 value 가져와서 저장
                .getValue();
        // refresh token 출력해보기
        log.info("refreshToken: {}", refreshToken);

        // 새로 발급된 토큰에 reissueAceessToken 메서드에 oldAcess토큰과 Refresh토큰을 넘겨서 저장하기
        String newAccessToken = authService.reissueAccessToken(oldAccessToken, refreshToken);

        // 새로 발급된 토큰 출력해보기
        log.info("newAccessToken: {}", newAccessToken);

        // 새로 발급된 토큰 넘겨주기
        return newAccessToken;
    }

    @GetMapping("/role")
    public Map<String, String> getLoginInfo(){
        Map<String, String> authInfo = CookieUtils.getCurrentUser();
        Map<String, String> loginInfo = authService.getLoginInfo(authInfo);
        return loginInfo;
    }

    @GetMapping("/users")
    public void getUsers(){
        log.info("AuthController /users GET 성공");
    }


    @PutMapping("/users")
    public ResponseEntity<?> createUserExtraInfo(@RequestBody UserExtraInfoReq userExtraInfoReq){
        Map<String, String> authInfo = CookieUtils.getCurrentUser();
        String accessToken = authService.createUserExtraInfo(userExtraInfoReq, authInfo);
        log.info("현재 위치 : {}", accessToken );
        return new ResponseEntity<>(accessToken, HttpStatus.CREATED);
    }
}