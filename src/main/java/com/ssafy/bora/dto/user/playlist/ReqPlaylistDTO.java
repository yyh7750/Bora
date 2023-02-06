package com.ssafy.bora.dto.user.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqPlaylistDTO {

    private String userId;

    private String playlist;
}