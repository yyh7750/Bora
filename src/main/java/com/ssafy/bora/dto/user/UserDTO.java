package com.ssafy.bora.dto.user;

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

    public static UserDTO convertEntityToDTO(User findUser) {
        UserDTO userDTO = new UserDTO();
        userDTO.id = findUser.getId();
        userDTO.name = findUser.getName();
        userDTO.nickName = findUser.getNickName();
        userDTO.playlist = findUser.getPlaylist();
        userDTO.isDelete = findUser.isDelete();
        userDTO.status = findUser.isStatus();
        return userDTO;
    }
}