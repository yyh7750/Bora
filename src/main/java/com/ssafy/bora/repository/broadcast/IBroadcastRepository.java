package com.ssafy.bora.repository.broadcast;

import com.ssafy.bora.entity.Broadcast;
import com.ssafy.bora.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBroadcastRepository extends JpaRepository<Broadcast,Long> ,BroadcastRepositoryCustom {

    Broadcast findByUserAndEndBroadIsNull(User viewer);

    Broadcast findBySessionId(String sessionId);
}
