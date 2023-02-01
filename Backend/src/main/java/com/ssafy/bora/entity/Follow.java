package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // 시청자가 DJ를 팔로우 할 때 User는 시청자 기준으로 매핑
    // DJ (시청자가 DJ 팔로우)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id")
    private User fromId;

    // 시청자 (팔로우한 시청자)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id")
    private User toId;

    private boolean isDelete;
}