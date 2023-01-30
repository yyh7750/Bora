package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.BlacklistDTO;
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
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class BlacklistServiceImpl implements IBlacklistService {

    private final IUserRepository userRepository;
    private final IBlacklistRepository blacklistRepository;

    @Override
    public BlacklistDTO registBlacklist(BlacklistDTO blacklistDTO) {
        
        String djId = blacklistDTO.getDjId();
        String viewerId = blacklistDTO.getViewerId();
        // 기존에 있는 정보 확인을 위한 메소드
        Blacklist hasBlacklist = blacklistRepository.findByDjIdAndViewerId(djId, viewerId);

        // 없다면 생성
        if (hasBlacklist == null) {
            // Entity에 저장할 Dj, Viwer 정보 가져오기
            User dj = userRepository.findById(blacklistDTO.getDjId()).get();
            User viewer = userRepository.findById(blacklistDTO.getViewerId()).get();

            Blacklist newBlacklist = new Blacklist();
            blacklistRepository.save(newBlacklist.addBlacklist(dj, viewer));

            // 가져온 Dj, Viewer 정보 저장하여 보내기
            BlacklistDTO registedBlacklist = new BlacklistDTO(newBlacklist);
            return registedBlacklist;
        }
        // 있다면 상태값만 변경하여 반환
        BlacklistDTO reviveStatusBlacklist = new BlacklistDTO(hasBlacklist.reviveStatus());
        
        return reviveStatusBlacklist;
    }

    @Override
    public List<Optional<Blacklist>> findAllBlacklist(String id) {
        User dj = userRepository.findById(id).get();
        List<Optional<Blacklist>> blacklist = blacklistRepository.findByDjAndIsDeleteFalse(dj);
        return blacklist;
    }

    @Override
    public int deleteBlacklist(BlacklistDTO blacklistDTO) {
        return blacklistRepository.deleteBlacklist(blacklistDTO.getDjId(), blacklistDTO.getViewerId());
    }
}