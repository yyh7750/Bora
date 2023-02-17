package com.ssafy.bora.security.jwt;


import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
OncePerRequestFilter를 상속 받아서 구현 되었고, 이 필터는 매 요청시 1번 수행 된다.
이 필터에서 HTTP 요청시 Authorization 헤더를 검색하여 JWT 토큰을 찾는다.
만약 토큰이 유효 하다면 JWT에서 인증 정보를 받아와 SecurityContext에 저장한다.
만약 유효하지 않는다면 아무것도 안함
최종적으로 필터 체인에 요청과 응답을 전달한다.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Http 요청에 대한 정보를 제공하는 Servlet API클래스이다. 현재 HTTP 요청에 대한 정보를 얻음
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        // resolveToken 메서드를 호출하여 얻은 JWT토큰 값
        String jwt = resolveToken(httpServletRequest);
        // 현재 요청의 URI를 저장한다. 고유하게 식별하는 주소이다.
        String requestURI = httpServletRequest.getRequestURI();

        log.info("request method: {}", request.getMethod());
        log.info(jwt);
        log.info("jwt filter");

        // 토큰이 정상적이면 SecurityContext에 set.
        if (StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
            Authentication authentication = jwtProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            log.info("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보를 꺼내오기 위한 메소드
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring((7));
        }

        return null;
    }
}