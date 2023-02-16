package com.ssafy.bora.repository.broadcast;

import com.ssafy.bora.entity.BroadcastOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BroadcastOrderRepository extends JpaRepository<BroadcastOrder, String> {
}
