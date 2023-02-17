package com.ssafy.bora.entity;

import com.ssafy.bora.dto.stroybox.ReqStoryBoxDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "storybox")
public class StoryBox implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dj_id")
    private User dj;

    private String viewerId;

    @Column(length = 64)
    private String title;

    @Column(length = 2048)
    private String contents;

    private LocalDateTime regDateTime;

    private boolean isDelete;

    private boolean isRead;

    public void deleteStoryBox() {
        this.isDelete = true;
    }

    public void updateStoryBox(ReqStoryBoxDTO reqStoryBoxDTO) {
        this.title = reqStoryBoxDTO.getTitle();
        this.contents = reqStoryBoxDTO.getContents();
    }

    public void read() {
        this.isRead = true;
    }
}