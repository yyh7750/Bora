package com.ssafy.bora.dto.sign_up;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpDTO {

    private String userId;

    private String nickName;

    private int age;

    private String gender;
}