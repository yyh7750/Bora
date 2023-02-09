package com.ssafy.bora.entity;

import com.ssafy.bora.dto.sign_up.SignUpDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class Privacy implements Serializable {

    @Id
    private String id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int age;

    @Column(length = 1)
    private String gender;

    @Column(length = 32)
    private String authenticationKey;

    public static Privacy createPrivacy(User user, SignUpDTO signUpDTO) {
        Privacy privacy = new Privacy();
        privacy.user = user;
        privacy.age = signUpDTO.getAge();
        privacy.gender = signUpDTO.getGender();
        // TODO authenticationKey에 대한 처리 필요
        return privacy;
    }
}