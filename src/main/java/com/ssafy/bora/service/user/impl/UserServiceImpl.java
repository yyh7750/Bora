package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.sign_up.SignUpDTO;
import com.ssafy.bora.dto.user.UserDTO;
import com.ssafy.bora.entity.Privacy;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.privacy.IPrivacyRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;
    private final IPrivacyRepository privacyRepository;

    @Override
    public UserDTO findUserById(String id) {
        User findUser = userRepository.findById(id).get();
        UserDTO userDTO = UserDTO.convertEntityToDTO(findUser);
        if (findUser.isStatus()) {
            userDTO.getStation(findUser);
        }
        return userDTO;
    }

    // 유저 닉네임 수정
    @Override
    public UserDTO updateUserNickNameById(UserDTO updateUserInfo) {
        User oldUser = userRepository.findById(updateUserInfo.getId()).get();
        UserDTO newUser = UserDTO.convertEntityToDTO(
                oldUser.updateUser(updateUserInfo.getNickName(), updateUserInfo.getDesc()));
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

    @Override
    public boolean checkDuplicateNickName(String nickName) {
        Optional<User> findUser = userRepository.findByNickName(nickName);
        if (!findUser.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public void createUserInfo(SignUpDTO signUpDTO) {
        // user 호출
        User user = userRepository.findById(signUpDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Privacy privacy = privacyRepository.findById(signUpDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        //user 정보 생성
        user.createUser(signUpDTO);

        //user age 변경
        privacy.updatePrivacy(signUpDTO.getAge(), signUpDTO.getGender());
    }
}