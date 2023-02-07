package com.ssafy.bora.service.auth;

import com.ssafy.bora.entity.PrivacyUser;
import com.ssafy.bora.security.jwt.JwtProvider;
import com.ssafy.bora.security.oauth2.CustomOAuth2User;
import com.ssafy.bora.repository.privacy.PrivacyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final PrivacyRepository privacyRepository;
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
        PrivacyUser findUser = privacyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found user"));
        // 찾는 정보의 리프레쉬 토큰이 없다면 날리기.
        if (!refreshToken.equals(findUser.getRefreshToken())) {
            throw new RuntimeException("invalid refresh token");
        }

        // jwt에서 생성된 권한의 토큰 날리기
        return jwtProvider.createAccessToken(authentication);
    }
}
