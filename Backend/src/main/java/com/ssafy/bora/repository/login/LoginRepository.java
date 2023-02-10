package com.ssafy.bora.repository.login;

import com.ssafy.bora.entity.LoginUser;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class LoginRepository {

    private static Long seq = 1L; // 직렬화 Serializalble
    private static Map<Long, LoginUser> table = new ConcurrentHashMap<>();

    public LoginUser save(LoginUser user) {
        if (user.getId() == null) {
            user.setId(seq);
            table.put(seq++, user);
        } else {
            table.replace(user.getId(), user);
        }

        return user;
    }

    public List<LoginUser> findAll() {
        Collection<LoginUser> values = table.values();
        return values.size() == 0 ? new ArrayList<>() : new ArrayList<>(values);
    }

    public Optional<LoginUser> findByEmail(String email) {
        for (LoginUser user : table.values()) {
            if (user.getEmail().equals(email)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}