package com.ssafy.bora.service.auth;

import com.ssafy.bora.dto.user.UserExtraInfoReq;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.enums.Role;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.security.jwt.JwtProvider;
import com.ssafy.bora.security.oauth2.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final IUserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 새로 발급된 토큰 로직 (오래된 것 하고 refresh 받아오기)
    public String reissueAccessToken(String oldAccessToken, String refreshToken) {
        // 만약에 validateToken메서드에 refreshToken이 없으면 에러 던지기
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new RuntimeException("invalid refresh token");
        }
        //처음에 하는 인증에다가 oldtoken의 정보를 가져와서 넣는다.
        Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);
        // 이메일 정보 저장
        String email = ((CustomOAuth2User) authentication.getPrincipal()).getEmail();
        // 이메일 출력
        log.info("access token reissue 대상: {}", email);

        // 유저메일을 찾기
        User findUser = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Not found user"));

        // jwt에서 생성된 권한의 토큰 날리기
        return jwtProvider.createAccessToken(authentication, findUser.getId().toString(), findUser.getRole().toString());
    }

    public String createUserExtraInfo(UserExtraInfoReq userExtraInfoReq, Map<String, String> authInfo){
        String email = authInfo.get("email");
        // 닉네임, 전화번호 저장 및 Role CUSTOMER로 바꾸기
        User user = userRepository.findById(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user = user.builder()
                .id(email)
                .role(Role.CUSTOMER)
                .build();

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String accessToken = jwtProvider.createAccessToken(authentication, user.getId().toString(), user.getRole().toString());

        userRepository.save(user);

        return accessToken;
    }


    public Map<String, String> getLoginInfo(Map<String,  String> authInfo) {
        Map<String, String> map = new HashMap<>();

        log.info(String.valueOf(Long.parseLong(authInfo.get("uId"))));
        User user = userRepository.findById(authInfo.get(authInfo))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(authInfo.get("role"));

        if(authInfo.get("role").equals("[[ROLE_CUSTOMER]]")){
            map.put("role", authInfo.get("role"));
        }else{
            Long uId = Long.parseLong(authInfo.get("uId"));

            map.put("role", authInfo.get("role"));
        }
        return map;
    }
}
