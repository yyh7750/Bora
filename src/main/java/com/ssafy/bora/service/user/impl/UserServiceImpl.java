package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.UserDTO;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    @Override
    public UserDTO findUserById(String id) {
        User findUser = userRepository.findById(id).get();
        UserDTO userDTO = UserDTO.convertEntityToDTO(findUser);
        return userDTO;
    }

    // 유저 닉네임 수정
    @Override
    public UserDTO updateUserNickNameById(UserDTO updateUserInfo) {
        User oldUser = userRepository.findById(updateUserInfo.getId()).get();
        UserDTO newUser = UserDTO.convertEntityToDTO(oldUser.updateUser(updateUserInfo.getNickName()));
        return newUser;
    }

    @Override
    public UserDTO deleteUserById(String id) {
        User findUser = userRepository.findById(id).get();
        if (findUser != null) {
            UserDTO deleteUser = UserDTO.convertEntityToDTO(findUser.deleteUser());
            return deleteUser;
        }
        return null;
    }
}