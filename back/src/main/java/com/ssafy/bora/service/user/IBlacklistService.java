package com.ssafy.bora.service.user;

import com.ssafy.bora.dto.blacklist.ReqBlacklistDTO;
import com.ssafy.bora.dto.blacklist.ResBlacklistDTO;
import com.ssafy.bora.entity.Blacklist;

import java.util.List;
import java.util.Optional;

public interface IBlacklistService {

    /**
     * desc : DJ가 시청자를 블랙리스트 목록에 등록하는 메소드
     *
     * @param reqBlacklistDTO : dj id, viewer id, blacklist status의 정보가 담긴 객체
     * @return BlacklistDTO : param과 동일
     */
    ResBlacklistDTO registBlacklist(ReqBlacklistDTO reqBlacklistDTO);

    /**
     * desc : DJ가 설정한 블랙리스트 목록을 조회하는 메소드
     *
     * @param id : 블랙리스트를 조회할 dj id
     * @return List<Optional<Blacklist>> : dj id에 해당하는 블랙리스트 목록
     */
    List<ResBlacklistDTO> findAllBlacklist(String id);

    /**
     * desc : DJ가 시청자를 블랙리스트 목록에 해제하는 메소드
     *
     * @param reqBlacklistDTO : dj id, viewer id, blacklist status의 정보가 담긴 객체
     * @return BlacklistDTO : param과 동일
     */
    int deleteBlacklist(ReqBlacklistDTO reqBlacklistDTO);
}