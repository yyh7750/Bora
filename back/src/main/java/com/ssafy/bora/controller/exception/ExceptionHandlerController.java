package com.ssafy.bora.controller.exception;

import com.ssafy.bora.dto.exception.ErrorResponse;
import com.ssafy.bora.dto.exception.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlerController {

    /**
     * 리턴 또는 참조하려는 값이 null이거나 찾지 못할때
     *
     * @param e
     * @return
     */
    @ExceptionHandler({NoSuchElementException.class, NullPointerException.class})
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(Exception e) {
        log.error("msg: NO_CONTENT");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 잘못된 인자값 처리
     *
     * @param e
     * @return
     */
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(e.getMessage())
                .error("BAD REQUEST")
                .build();
        log.error("msg: " + errorResponse.getMessage() + ", error: " + errorResponse.getError());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * 인자가 허용범위 값을 넘어갈 때
     *
     * @param e
     * @return
     */
    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<ErrorResponse> handleIndexOutOfBoundsException(IndexOutOfBoundsException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(e.getMessage())
                .error("INTERNAL SERVER ERROR")
                .build();
        log.error("msg: " + errorResponse.getMessage() + ", error: " + errorResponse.getError());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 권한(인증) 처리
     *
     * @param e
     * @return
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(e.getMessage())
                .error("UNAUTHORIZED")
                .build();
        log.error("msg: " + errorResponse.getMessage() + ", error: " + errorResponse.getError());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}