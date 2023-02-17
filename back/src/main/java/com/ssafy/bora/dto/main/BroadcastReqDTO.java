package com.ssafy.bora.dto.main;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastReqDTO {
    private String userId;
    private String imgUrl;
    private String title;
    private String[] moods;
    private int maxViewer;
    private String sessionId;
}
