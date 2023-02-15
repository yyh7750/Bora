package com.ssafy.bora.security.oauth2;

import com.ssafy.bora.entity.Privacy;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.enums.Role;
import com.ssafy.bora.repository.privacy.IPrivacyRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.security.jwt.JwtProvider;
import com.ssafy.bora.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;


@Slf4j
@Component
@RequiredArgsConstructor
// OAuth2 로그인을 위한 인증 성공 핸들러로 사용된다.
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final IPrivacyRepository iPrivacyRepository;
    private final JwtProvider jwtProvider;

    private final IUserRepository userRepository;
    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_TYPE = "Bearer";

    @Transactional
    @Override
    // 사용자가 OAuth2를 통해 로그인 하면 메서드가 작동한다.
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Handler 들어왔다");
        try {
            // 인증에서 얻은 Principal 개체를 사용자 지정 개체로 캐스팅한다.
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // 요청한 쿠키에서 리다이렉션 URI를 추출하고 유효성을 검증한다.
            Optional<String> redirectUri = CookieUtils.getCookie(request, "redirect-uri")
                    .map(Cookie::getValue);

            // 유효한 URI가 아닌 경우 예외 발생시킨다.
            if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
                throw new IllegalArgumentException(("Authentication Failed: Unauthorized Redirect URI"));
            }

            log.info(authentication.getAuthorities().toString()); // [ROLE_GUEST]
            log.info(((CustomOAuth2User) authentication.getPrincipal()).getEmail().toString()); // 7

            // 사용자의 고유 식별자 Id를 추출하고
            String uId = ((CustomOAuth2User) authentication.getPrincipal()).getEmail().toString();
            log.info(String.valueOf(oAuth2User));
            log.info(oAuth2User.getEmail());

            // jwt provider 개체를 사용하여 액세스 및 리프레쉬 토큰 생성한다.
            String accessToken = jwtProvider.createAccessToken(authentication, uId, authentication.getAuthorities().toString());
            String refreshToken = jwtProvider.createRefreshToken(authentication);

            log.info("accessToken : {}", accessToken);
            log.info("refreshToken : {}", refreshToken);
            log.info("OAuth2LoginSuccessHandler");

            // oAuth2User 정보를 데이터베이스에 저장한다.
            User user = saveOrUpdateUser(oAuth2User);
            saveOrUpdateRefreshToken(refreshToken, user);

            // 리프레쉬 토큰의 유효 시간과 동일한 최대 수명을 사용하여 리프레쉬 토큰을 쿠키로
            // HTTP 응답에 추가한다.
            ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                    .httpOnly(true)
                    .maxAge(jwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                    .path("/")
                    .build();

            clearAuthenticationAttrubutes(request, response);

            response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + accessToken);
            response.addHeader("Set-Cookie", cookie.toString());

            // 사용자의 ROLE에 따라 리다이렉션 URL을 결정한다.
            // 쿼리 매게변수로 액세스 토큰과 함께 대상 URL로 사용자를 리다이렉션한다.
            String targetUrl;
            // 처음 요청한 사용자는 회원가입 페이지로
            if (oAuth2User.getRole() == Role.GUEST) {
                log.info("GUEST");
                // http://localhost:3000/signup?token={accessToken}
                targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/signup")
                        .queryParam("token", accessToken)
                        .build().toUriString();
            } else {
                log.info("CUSTOMER");
                targetUrl = UriComponentsBuilder.fromUriString(redirectUri.orElse("http://localhost:3000"))
                        .queryParam("token", accessToken)
                        .build().toUriString();
            }

            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } catch (Exception e) {
            throw e;
        }
    }

    private void clearAuthenticationAttrubutes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
    }

    private User saveOrUpdateUser(CustomOAuth2User oAuth2User) {

        Optional<User> optionalUser = userRepository.findById(oAuth2User.getEmail());

        User user;

        if (optionalUser.isEmpty()) {
            user = User.builder()
                    .id(oAuth2User.getEmail())
                    .build();
        } else {
            user = optionalUser.get();
        }

        return userRepository.save(user);
    }


    private void saveOrUpdateRefreshToken(String refreshToken, User user) {

        Privacy optionalPrivacy = iPrivacyRepository.findById(user.getId())
                .orElse(null);

        User user1 = userRepository.findById(user.getId()).get();

        log.info("user test = {}", user1);
        if (optionalPrivacy == null) {
            Privacy privacy = Privacy.builder()
                    .user(user1)
                    .refreshToken(refreshToken)
                    .build();
            log.info("test privacy = {}",privacy);
            iPrivacyRepository.save(privacy);
        }
    }

    private boolean isAuthorizedRedirectUri(String uri) {

        URI clientRedirectUri = URI.create(uri);
        if (clientRedirectUri.getHost().equals("http://localhost:8080")) {
            return true;
        }
        return false;
    }
}
