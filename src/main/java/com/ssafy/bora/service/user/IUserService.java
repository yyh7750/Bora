package com.ssafy.bora.service.user;

import com.ssafy.bora.dto.user.UserDTO;

public interface IUserService {

    public UserDTO findUserById(String id);

    public UserDTO updateUserNickNameById(UserDTO user);

    public UserDTO deleteUserById(String id);

}