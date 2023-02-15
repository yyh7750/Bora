package com.ssafy.bora.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.ssafy.bora.entity.enums.Role;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Builder
public class User {

    @Id
    @Column(length = 32)
    private String id;

    @Column(name = "nick_name", length = 10)
    private String nickName;

    private boolean isDelete;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    private boolean status;

    @Column(length = 200)
    private String desc;

    @Column(name = "profile_img")
    private String profileImg;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Station station;

    public void renewUser() {
        this.isDelete = false;
    }

    public void createUser(SignUpDTO signUpDTO) {
        this.nickName = signUpDTO.getNickName();
        this.role = Role.CUSTOMER;
    }

    public User updateUser(String nickName, String desc) {
        this.nickName = nickName;
        this.desc = desc;
        return this;
    }

    public User deleteUser() {
        this.isDelete = true;
        return this;
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public void createStation() {
        this.status = true;
    }

    public void deleteStation() {
        this.status = false;
    }
}