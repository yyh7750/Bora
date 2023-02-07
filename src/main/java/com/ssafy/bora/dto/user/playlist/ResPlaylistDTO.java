package com.ssafy.bora.dto.user.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ResPlaylistDTO {

    private Map<String, String> playlist;
}
