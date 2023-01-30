package com.ssafy.bora.dto;

import com.ssafy.bora.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class UserDTO {

    private String id;

    private String name;

    private String nickName;

    private Map<String, String> playlist;

    private boolean isDelete;

    private boolean status;

    public UserDTO(User findUser) {
        this.id = findUser.getId();
        this.name = findUser.getName();
        this.nickName = findUser.getNickName();
        this.playlist = findUser.getPlaylist();
        this.isDelete = findUser.isDelete();
        this.status = findUser.isStatus();
    }
}