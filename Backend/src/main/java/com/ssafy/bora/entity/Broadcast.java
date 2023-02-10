package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@DynamicInsert
@NoArgsConstructor
public class Broadcast implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private String mood;

    @Column(name = "start_time")
    private LocalDateTime startBroad;

    @Column(name = "end_time")
    private LocalDateTime endBroad;

    @Column(name = "max_viewer")
    @ColumnDefault("0")
    private int maxViewer;

    @Column(name = "is_on_time")
    @ColumnDefault("N")
    private boolean isOnTime;

    private String sessionId;
}