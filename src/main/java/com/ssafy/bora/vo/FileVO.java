package com.ssafy.bora.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FileVO {
    private String imgOriginalName;
    private String imgNewName;
    private String imgPath;
    private LocalDateTime imgUploadTime;

    @Builder
    public FileVO(String imgOriginalName, String imgNewName, String imgPath, LocalDateTime imgUploadTime) {
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgPath = imgPath;
        this.imgUploadTime = imgUploadTime;
    }
}
