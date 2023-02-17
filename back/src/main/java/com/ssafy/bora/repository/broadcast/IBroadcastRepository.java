package com.ssafy.bora.repository.broadcast;

import com.ssafy.bora.dto.user.MaxViewerDTO;
import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IBroadcastRepository extends JpaRepository<Broadcast,Long> ,BroadcastRepositoryCustom {

    Broadcast findByUserAndEndBroadIsNull(User viewer);

    Broadcast findBySessionIdAndEndBroadIsNull(String sessionId);
    Broadcast findBySessionIdAndEndBroadIsNotNull(String sessionId);

    @Query(value="select count(*),sum(b.maxViewer) from Broadcast b where b.user.id=:djId")
    MaxViewerDTO countMaxView(String djId);
    Broadcast findBySessionId(String sessionId);

}
