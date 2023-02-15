package com.ssafy.bora.security.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

// jwtExceptionResponse 클래스로 예외 발생시 응답으로 전송되는 JSON 형식의 메시지를 관리한다.
@AllArgsConstructor // 모든 필드를 인자로 갖는 생성자를 자동 생성 (message, httpStatus)
@Getter
public class JwtExceptionResponse {
    private final String message;
    private final HttpStatus httpStatus;

    // Jackson 라이브러리를 사용하며 현재 객체를 JSON 형식으로 변화하여 반환
    // JsonProcessingException 예외를 던질 수 있다.
    public String convertToJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}