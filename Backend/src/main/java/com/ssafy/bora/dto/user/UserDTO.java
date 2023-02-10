package com.ssafy.bora.dto.user;

import com.ssafy.bora.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDTO {

    private String id;

    private String nickName;

    private boolean isDelete;

    private boolean status;

    public static UserDTO convertEntityToDTO(User findUser) {
        UserDTO userDTO = new UserDTO();
        userDTO.id = findUser.getId();
        userDTO.nickName = findUser.getNickName();
        userDTO.isDelete = findUser.isDelete();
        userDTO.status = findUser.isStatus();
        return userDTO;
    }
}