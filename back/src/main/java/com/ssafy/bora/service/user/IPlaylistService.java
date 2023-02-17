package com.ssafy.bora.service.user;

import com.ssafy.bora.dto.user.playlist.ReqPlaylistDTO;
import com.ssafy.bora.dto.user.playlist.ResPlaylistDTO;

import java.util.List;

public interface IPlaylistService {

    /**
     *  플레이리스트를 생성할 때 넣을 데이터를 조회를 한 후 생성한다.
     *  조회하는 방법은 2가지다.
     *  1. 유저가 시간표에 해당하는 칸을 눌렀을 경우
     *  2. 유저가 검색창에 직접 dj명이나 방송국명을 검색하는 경우
     *
     *  1번의 경우 칸을 눌렀을 때 해당 시간에 포함된 방송의 리스트를 넘겨준다.
     *  2번의 경우 검색한 dj명 또는 방송국명과 일치하는 정보를 넘겨준다.
     *  2-1. Front에서 필터링하는 방식을 적용하기로 하여 전체 리스트만 넘겨주면 된다.
     *  2-2. 전체 리스트는 등록된 방송국 정보를 List<ResPlaylistDTO>로 반환해준다.
     */

    /**
     * desc: 1번에 해당하는 경우
     *
     * @return List<ResPlaylist> 해당 시간에 포함된 방송의 리스트
     */
    List<ResPlaylistDTO> getPlaylistOnTime();

    /**
     * desc: 2번에 해당하는 경우
     *
     * @return List<ResPlaylistDTO> 전체 리스트를 반환해준다.
     */
    List<ResPlaylistDTO> getPlaylistAll();

    /**
     * desc: 플레이리스트를 생성하기 위한 메소드.
     * Front에서 생성된 정보 전체를 보내준다.
     *
     * @param reqPlaylistDtoList
     * @return int : 생성 됐는지, 안됐는지
     */
    int createOrUpdatePlaylist(List<ReqPlaylistDTO> reqPlaylistDtoList);

    /**
     * desc: userId에 해당하는 유저의 플레이리스트 조회
     *
     * @param userId
     * @return
     */
    List<ResPlaylistDTO> findByUserId(String userId);
}