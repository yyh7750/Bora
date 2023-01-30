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
        UserDTO userDTO = new UserDTO(findUser);
        return userDTO;
    }

    @Override
    public UserDTO updateUserById(UserDTO updateUserInfo) {
        User oldUser = userRepository.findById(updateUserInfo.getId()).get();
        UserDTO newUser = new UserDTO(oldUser.updateUser(updateUserInfo));
        return newUser;
    }

    @Override
    public UserDTO deleteUserById(String id) {
        User findUser = userRepository.findById(id).get();
        if (findUser != null && !findUser.isStatus()) {
            UserDTO deleteUser = new UserDTO(findUser.deleteUser());
            return deleteUser;
        }
        // 방송국이 있을 경우 (status ture) 로직을 새로 짜줘야함
        
        return null;
    }
}