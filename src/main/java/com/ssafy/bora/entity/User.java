package com.ssafy.bora.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.ssafy.bora.entity.enums.Role;
import com.ssafy.bora.vo.FileVO;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@DynamicInsert
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

    @Column(length = 200)
    private String desc;

    @Column
    @JoinColumn(name = "profile_img")
    private String profileImg;

    @Column(name = "status", unique = true)
    private boolean status;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Station station;


    public void renewUser() {
        this.isDelete = false;
    }

    public static User createUser(SignUpDTO signUpDTO) {
        User user = new User();
        user.id = signUpDTO.getUserId();
        user.nickName = signUpDTO.getNickName();
        user.isDelete = false;
        user.status = false;
        return user;
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

    public void updateNickname(String nickname) {
        this.nickName = nickname;
    }

    public void updateDesc(String desc) {
        this.desc = desc;
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


    public void updateRole() {
        this.role = Role.CUSTOMER;
    }
}