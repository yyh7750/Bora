package com.ssafy.bora.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PrivacyDTO {
    private int age;

    private String gender;

    public PrivacyDTO(int age, String gender) {
        this.age = age;
        this.gender = gender;
    }
}
