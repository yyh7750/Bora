package com.ssafy.bora.dto.sign_up;

import com.ssafy.bora.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Getter
@NoArgsConstructor
@Component
public class SignUpDTO {

    private String userId;

    private String nickName;

    private int age;

    private String gender;

}