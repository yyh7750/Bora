package com.ssafy.bora.repository.user;

import com.ssafy.bora.dto.BlacklistDTO;
import com.ssafy.bora.entity.Blacklist;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IBlacklistRepository extends JpaRepository<Blacklist, Integer> {

    public List<Optional<Blacklist>> findByDjAndIsDeleteFalse(User dj);

//    @Query(value = "update blacklist set is_delete = true where dj_id = ? and viewer_id = ?")
//    public BlacklistDTO deleteBlacklist();
}