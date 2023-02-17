package com.ssafy.bora.entity;

import com.ssafy.bora.dto.sign_up.SignUpDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Privacy implements Serializable {

    @Id
    @Column(name = "user_id")
    private String id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int age;

    @Column(length = 1)
    private String gender;

    @Column
    private String refreshToken;

    public static Privacy createPrivacy(User user, SignUpDTO signUpDTO, String refreshToken) {
        Privacy privacy = new Privacy();
        privacy.user = user;
        privacy.age = signUpDTO.getAge();
        privacy.gender = signUpDTO.getGender();
        privacy.refreshToken = refreshToken;
        return privacy;
    }

    public void updatePrivacy(int age, String gender){
        this.age = age;
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Privacy{" +
                ", user=" + user +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}