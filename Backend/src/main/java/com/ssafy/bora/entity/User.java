package com.ssafy.bora.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class User {

    @Id
    @Column(length = 16)
    private String id;

    @Column(length = 10)
    private String name;

    @Column(name = "nick_name", length = 10)
    private String nickName;

    @Type(type = "json")
    private Map<String, String> playlist;

    private boolean isDelete;

    private boolean status;
}