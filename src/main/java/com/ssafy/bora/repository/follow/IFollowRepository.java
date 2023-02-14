package com.ssafy.bora.repository.follow;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bora.dto.main.TopTenDTO;
import com.ssafy.bora.entity.follow.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IFollowRepository extends JpaRepository<Follow, Integer> {

    @Modifying
    @Query(value = "update Follow f set f.isDelete=true where f.dj.id=:djId and f.viewer.id=:viewerId")
    void updateByDjAndViewer(@Param("djId") String djId, @Param("viewerId") String viewerId);

    /**
     * desc: 내가 팔로우한 DJ 목록 조회
     *
     * @param viewerId
     * @return
     */
    @Query(value = "select f from Follow f where f.viewer.id=:viewerId and f.isDelete=false")
    List<Follow> findAllFollowingList(@Param("viewerId") String viewerId);

    /**
     * desc: 나를 팔로우한 시청자 목록 조회
     * 
     * @param djId
     * @return
     */
    @Query(value = "select f from Follow f where f.dj.id=:djId and f.isDelete=false")
    List<Follow> findAllFollowerList(@Param("djId") String djId);

    @Query(nativeQuery = true, value = "select f.dj_id, count(*) as followcnt from follow f group by f.dj_id order by followcnt desc limit 10")
    List<TopTenDTO> countTopTen();
}