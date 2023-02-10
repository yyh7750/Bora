package com.ssafy.bora.repository.user;

import com.ssafy.bora.entity.Blacklist;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface IBlacklistRepository extends JpaRepository<Blacklist, Integer> {

    /**
     * desc: Dj ID와 Viewer ID로 블랙리스트 테이블에 해당 정보 있는지 확인 (있다면 상태값 덮어쓰기 위함)
     * @param djId
     * @param viewerId
     * @return : Blacklist : 기존에 DJ가 차단한 Viewer ID에 해당하는 차단 정보
     */
    Blacklist findByDjIdAndViewerId(String djId, String viewerId);

    /**
     * desc: 해당 DJ의 블랙리스트 목록 조회
     * @param dj
     * @return
     */
    List<Optional<Blacklist>> findByDjAndIsDeleteFalse(User dj);

    // DJ 블랙리스트에 있던 Viewer의 블랙리스트 상태값을 삭제해준다.(isDelete 상태값 true로 변경)
    @Modifying
    @Query(value = "update Blacklist b set b.isDelete=true where b.dj.id=:djId and b.viewer.id=:viewerId")
    int deleteBlacklist(@Param("djId") String djId, @Param("viewerId") String viewerId);

}