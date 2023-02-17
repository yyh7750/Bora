package com.ssafy.bora.service.user.impl;

import com.ssafy.bora.dto.blacklist.ReqBlacklistDTO;
import com.ssafy.bora.dto.blacklist.ResBlacklistDTO;
import com.ssafy.bora.entity.Blacklist;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.user.IBlacklistRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.service.user.IBlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class BlacklistServiceImpl implements IBlacklistService {

    private final IUserRepository userRepository;
    private final IBlacklistRepository blacklistRepository;

    @Override
    public ResBlacklistDTO registBlacklist(ReqBlacklistDTO reqBlacklistDTO) {

        String djId = reqBlacklistDTO.getDjId();
        String viewerId = reqBlacklistDTO.getViewerId();
        // 기존에 있는 정보 확인을 위한 메소드
        Blacklist hasBlacklist = blacklistRepository.findByDjIdAndViewerId(djId, viewerId);

        // 없다면 생성
        if (hasBlacklist == null) {
            // Entity에 저장할 Dj, Viewer 정보 가져오기
            User dj = userRepository.findById(reqBlacklistDTO.getDjId()).get();
            User viewer = userRepository.findById(reqBlacklistDTO.getViewerId()).get();

            Blacklist newBlacklist = new Blacklist();
            blacklistRepository.save(newBlacklist.addBlacklist(dj, viewer));

            // 가져온 Dj, Viewer 정보 저장하여 보내기
            ResBlacklistDTO registedBlacklist = ResBlacklistDTO.convertEntityToResDTO(newBlacklist);
            return registedBlacklist;
        }
        // 있다면 상태값만 변경하여 반환
        ResBlacklistDTO reviveStatusBlacklist = ResBlacklistDTO.convertEntityToResDTO(hasBlacklist.reviveStatus());
        return reviveStatusBlacklist;
    }

    @Override
    public List<ResBlacklistDTO> findAllBlacklist(String id) {
        // DJ에 해당하는 블랙리스트 목록 찾기
        User dj = userRepository.findById(id).get();
        List<Optional<Blacklist>> blacklist = blacklistRepository.findByDjAndIsDeleteFalse(dj);

        // Response DTO로 변환
        List<ResBlacklistDTO> resBlacklist = new ArrayList<>();
        for (Optional<Blacklist> black : blacklist) {
            resBlacklist.add(ResBlacklistDTO.convertEntityToResDTO(black.get()));
        }

        return resBlacklist;
    }

    @Override
    public int deleteBlacklist(ReqBlacklistDTO reqBlacklistDTO) {
        return blacklistRepository.deleteBlacklist(reqBlacklistDTO.getDjId(), reqBlacklistDTO.getViewerId());
    }
}