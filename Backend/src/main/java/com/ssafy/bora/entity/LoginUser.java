package com.ssafy.bora.entity;

import com.ssafy.bora.security.oauth2.CustomOAuth2User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class LoginUser {

    private Long id;
    private String email;
    private String nickname;
    private String refreshToken;
    public LoginUser() {}

    @Builder
    public LoginUser(Long id, String email, String nickname, String refreshToken) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
    }

    public static LoginUser of(CustomOAuth2User oAuth2User) {
        LoginUser user = new LoginUser();
        user.email = oAuth2User.getEmail();
        user.nickname = oAuth2User.getNickname();
        return user;
    }

    public void update(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
