package com.ssafy.bora.dto.stroybox;

import com.ssafy.bora.entity.StoryBox;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResStoryBoxDTO {

    private int id;

    private String djId;

    private String viewerId;

    private String title;

    private String contents;

    private LocalDateTime regDateTime;

    private boolean isRead;

    public static ResStoryBoxDTO convertEntityToResDTO(StoryBox registeredStoryBox) {
        ResStoryBoxDTO resStoryBoxDTO = new ResStoryBoxDTO();
        resStoryBoxDTO.id = registeredStoryBox.getId();
        resStoryBoxDTO.djId = registeredStoryBox.getDj().getId();
        resStoryBoxDTO.viewerId = registeredStoryBox.getViewerId();
        resStoryBoxDTO.title = registeredStoryBox.getTitle();
        resStoryBoxDTO.contents = registeredStoryBox.getContents();
        resStoryBoxDTO.regDateTime = registeredStoryBox.getRegDateTime();
        resStoryBoxDTO.isRead = registeredStoryBox.isRead();
        return resStoryBoxDTO;
    }
}
