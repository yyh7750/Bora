package com.ssafy.bora.entity.follow;

import com.ssafy.bora.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class Follow implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // 시청자가 DJ를 팔로우 할 때 User는 시청자 기준으로 매핑
    // DJ (시청자가 DJ 팔로우)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dj_id")
    private User dj;

    // 시청자 (팔로우한 시청자)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "viewer_id")
    private User viewer;

    private boolean isDelete;
}