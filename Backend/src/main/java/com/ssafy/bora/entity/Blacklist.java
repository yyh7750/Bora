package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Blacklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Dj가 시청자 블랙할 때 Dj 아이디 기준으로 User 클래스랑 매핑
    // -> User = Dj : OneToOne
    @OneToOne
    @JoinColumn(name = "dj_id")
    private User dj;

    // 시청자 : Dj 기준으로 시청자가 여럿일 수 있음
    @ManyToOne
    @JoinColumn(name = "viewer_id")
    private User viewer;

    private boolean isDelete;
}
