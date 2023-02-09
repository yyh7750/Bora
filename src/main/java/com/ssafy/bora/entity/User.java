package com.ssafy.bora.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
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

    private boolean isDelete;

    private boolean status;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Station station;

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