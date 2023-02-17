package com.ssafy.bora.dto.stroybox;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ReqStoryBoxDTO {

    private String djId;

    private String viewerId;

    private String title;

    private String contents;
    private boolean is_read;
}
