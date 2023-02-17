package com.ssafy.bora.util;

import com.ssafy.bora.security.jwt.JwtProvider;
import com.ssafy.bora.security.jwt.JwtFilter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
public class CookieUtils {

    // API 호출 시 헤더에 담겨져있는 사용자 정보를 알 수 있다.
    public static Map<String, String> getCurrentUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        log.info("여기에 id가 들어갈까");
        log.info(((User) authentication.getPrincipal()).getPassword());
        Map<String, String> authInfo = new HashMap<>();
        authInfo.put("id", ((User) authentication.getPrincipal()).getPassword());
        authInfo.put("email", authentication.getName());
        authInfo.put("role", authentication.getAuthorities().toString());
        return authInfo;
    }



    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies(); // 요청
        if (cookies != null && cookies.length > 0) { //쿠키가 있으면
            for (Cookie cookie : cookies) { // 처음 부터 끝까지 돌리고
                if (cookie.getName().equals(name)) { // 받아온 이름과 같다면
                    return Optional.of(cookie); // optional로 맵핑된 cookie 반환
                }
            }
        }

        return Optional.empty(); // 쿠키가 없으면 empty 반환
    }
}
