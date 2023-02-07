package com.ssafy.bora.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public class CookieUtils {

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
