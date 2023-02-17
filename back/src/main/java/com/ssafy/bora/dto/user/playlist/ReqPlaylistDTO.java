package com.ssafy.bora.dto.user.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ReqPlaylistDTO {

    private String userId;

    private String djName;

    private String day;

    private String stationName;

    private String startTime;

    private String endTime;
}