package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class StoryBox implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dj_id")
    private User dj;

    private String writerId;

    @Column(length = 64)
    private String title;

    @Column(length = 2048)
    private String contents;

    private LocalDate regDate;

    private boolean isDelete;
}