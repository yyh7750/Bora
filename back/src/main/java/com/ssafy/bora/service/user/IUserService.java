package com.ssafy.bora.service.user;

import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.ssafy.bora.dto.user.UserDTO;

public interface IUserService {

    UserDTO findUserById(String id);

    UserDTO updateUserNickNameById(UserDTO userDTO);

    UserDTO deleteUserById(String id);

    boolean checkDuplicateNickName(String nickName);

    void createUserInfo(SignUpDTO signUpDTO);

}