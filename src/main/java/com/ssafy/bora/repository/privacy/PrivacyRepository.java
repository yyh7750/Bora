package com.ssafy.bora.repository.privacy;

import com.ssafy.bora.entity.PrivacyUser;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class PrivacyRepository {

    private static Long seq = 1L; // 직렬화 Serializalble
    private static Map<Long, PrivacyUser> table = new ConcurrentHashMap<>();

    public PrivacyUser save(PrivacyUser user) {
        if (user.getId() == null) {
            user.setId(seq);
            table.put(seq++, user);
        } else {
            table.replace(user.getId(), user);
        }

        return user;
    }

    public List<PrivacyUser> findAll() {
        Collection<PrivacyUser> values = table.values();
        return values.size() == 0 ? new ArrayList<>() : new ArrayList<>(values);
    }

    public Optional<PrivacyUser> findByEmail(String email) {
        for (PrivacyUser user : table.values()) {
            if (user.getEmail().equals(email)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}