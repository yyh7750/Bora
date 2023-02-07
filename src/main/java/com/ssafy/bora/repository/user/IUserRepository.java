package com.ssafy.bora.repository.user;

import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, String> {

}
