package com.ssafy.bora.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class Station implements Serializable {

    @Id
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 32)
    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Column(length = 1024)
    private String desc;

    @Column(length = 64)
    private String notice;

    @Type(type = "json")
    @Column(name = "schedule", columnDefinition = "longtext")
    private Map<String, String> schedule = new HashMap<>();
}
