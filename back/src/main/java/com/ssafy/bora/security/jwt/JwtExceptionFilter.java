package com.ssafy.bora.security.jwt;

import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 자체 필터로 HTTP 요청에 대한 응답을 처리하는 역할을 한다.
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
    // 필터 체인에서 특정 요청에 대한 응답을 처리하며 JWT인증 과정에서 예외가 발생하면 
    // setErrorResponse() 메서드를 호출하여 HTTP 상태코드 401로 설정하고 JSON형식으로 메시지 보냄
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        }catch (JwtException e){
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, e);
        }
    }

    // 상태 코드와 응답, 예외 객체를 인자로 받는다.
    // 응답의 HTTP 상태 코드와 Content-Type을 설정하고, 오류 메세지를 보낸다.
    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex) throws IOException {
        res.setStatus(status.value());
        res.setContentType("application/json; charset=UTF-8");

        JwtExceptionResponse jwtExceptionResponse = new JwtExceptionResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        res.getWriter().write(jwtExceptionResponse.convertToJson());
    }
}
