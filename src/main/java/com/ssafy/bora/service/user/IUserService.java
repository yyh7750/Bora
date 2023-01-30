package com.ssafy.bora.service.user;

import com.ssafy.bora.dto.UserDTO;

public interface IUserService {

    public UserDTO findUserById(String id);

    public UserDTO updateUserById(UserDTO user);

    public UserDTO deleteUserById(String id);

}