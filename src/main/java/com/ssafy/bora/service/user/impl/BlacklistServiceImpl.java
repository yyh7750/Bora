package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.BlacklistDTO;
import com.ssafy.bora.dto.UserDTO;
import com.ssafy.bora.entity.Blacklist;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.user.IBlacklistRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.user.IBlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlacklistServiceImpl implements IBlacklistService {

    private final IUserRepository userRepository;
    private final IBlacklistRepository blacklistRepository;

    @Override
    @Transactional
    public BlacklistDTO registBlacklist(BlacklistDTO blacklistDTO) {
        // Entity에 저장할 Dj, Viwer 정보 가져오기
        User dj = userRepository.findById(blacklistDTO.getDjId()).get();
        User viewer = userRepository.findById(blacklistDTO.getViewerId()).get();

        // 가져온 Dj, Viewer 정보 저장하여 보내기 : 서비스 계층에서 처리하여 Blacklist 값으로 반환해준다.
        Blacklist blacklist = new Blacklist();
        BlacklistDTO registedBlacklist = new BlacklistDTO(blacklist.addBlacklist(dj, viewer));
        return registedBlacklist;
    }

    @Override
    @Transactional
    public List<Optional<Blacklist>> findAllBlacklist(String id) {
        User dj = userRepository.findById(id).get();
        List<Optional<Blacklist>> blacklist = blacklistRepository.findByDjAndIsDeleteFalse(dj);
        return blacklist;
    }

    @Override
    @Transactional
    public BlacklistDTO deleteBlacklist(BlacklistDTO blacklistDTO) {

        return null;
    }
}