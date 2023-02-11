package com.ssafy.bora.dto.main;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class AirtimeDTO {
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @QueryProjection
    public AirtimeDTO(LocalDateTime startTime, LocalDateTime endTime){
        this.endTime=endTime;
        this.startTime=startTime;
    }
}
