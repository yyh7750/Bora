package com.ssafy.bora.dto.main;

import com.ssafy.bora.entity.ViewLog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ViewLogDTO {
    private String viewerId;
    private String sessionId;
    private int heartClick;
    private int chatCnt;
    private LocalDateTime entrance;
    private LocalDateTime exit;

}
