package com.ssafy.bora.repository.user;

import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, String> {

    Optional<User> findByNickName(String nickName);
}
