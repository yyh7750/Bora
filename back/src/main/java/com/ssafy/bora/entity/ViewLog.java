package com.ssafy.bora.entity;

import com.ssafy.bora.dto.main.ViewLogDTO;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
public class ViewLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "viewer_id")
    private User viewer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dj_id")
    private User dj;
    @Column(name="heart_click")
    private int heartClick;
    @Column(name="chat_cnt")
    private int chatCnt;
    //(나간시간-들어간시간)/방송 열려있던 시간(date로 따오자고)
    @Column(name = "duration_time")
    private long durationTime;


    public static ViewLog convertDtoToEntity(User viewer,User dj,ViewLogDTO vlDto,long durationTime){
        ViewLog viewLog = new ViewLog();
        viewLog.dj=dj;
        viewLog.viewer=viewer;
        viewLog.heartClick= vlDto.getHeartClick();
        viewLog.chatCnt= vlDto.getChatCnt();
        viewLog.durationTime=durationTime;
        return viewLog;
    }

}