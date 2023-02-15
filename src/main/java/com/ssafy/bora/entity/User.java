package com.ssafy.bora.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TypeDef;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @Column(length = 16)
    private String id;

    @Column(name = "nick_name", length = 10)
    private String nickName;

    private boolean isDelete;

    private String profile_img;
    private boolean status;

    private String desc;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Station station;

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

    public void createStation() {
        this.status = true;
    }

    public void deleteStation() {
        this.status = false;
    }
}