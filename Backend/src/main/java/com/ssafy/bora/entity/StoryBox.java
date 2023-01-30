package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StoryBox {

    @Id
    @OneToOne
    @JoinColumn(name = "dj_id")
    private User dj;

    @ManyToOne
    @JoinColumn(name = "writer_id")
    private User writer;

    @Column(length = 64)
    private String title;

    @Column(length = 2048)
    private String contents;

    private LocalDate regDate;

    private boolean isDelete;
}