package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Blacklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Dj가 시청자 블랙할 때 Dj 아이디 기준으로 User 클래스랑 매핑
    // -> User = Dj : OneToOne
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dj_id")
    private User dj;

    // 시청자 : Dj 기준으로 시청자가 여럿일 수 있음
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "viewer_id")
    private User viewer;

    private boolean isDelete;

    public Blacklist addBlacklist(User dj, User viewer) {
        this.dj = dj;
        this.viewer = viewer;
        this.isDelete = false;
        return this;
    }

    public Blacklist reviveStatus() {
        this.isDelete = false;
        return this;
    }
}