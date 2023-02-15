package com.ssafy.bora.repository.privacy;

import com.ssafy.bora.entity.Privacy;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IPrivacyRepository extends JpaRepository<Privacy, String> {
    //Optional<Privacy> findById(String email);

}
