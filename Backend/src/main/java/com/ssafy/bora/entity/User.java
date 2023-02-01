package com.ssafy.bora.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.bora.dto.UserDTO;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Map;

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

    @Column(length = 10)
    private String name;

    @Column(name = "nick_name", length = 10)
    private String nickName;

    // 문자열 변경 예정
    @Type(type = "json")
    private Map<String, String> playlist;

    private boolean isDelete;

    private boolean status;

    public User updateUser(String nickName) {
        this.nickName = nickName;
        return this;
    }

    public User deleteUser() {
        this.isDelete = true;
        return this;
    }

    public void createStation(){
        this.status = true;
    }

    public void deleteStation(){
        this.status = false;
    }
}