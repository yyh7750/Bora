package com.ssafy.bora.security.oauth2;

import com.ssafy.bora.entity.User;
import com.ssafy.bora.entity.enums.Role;
import lombok.Builder;
import lombok.Getter;
import java.util.Map;

// 카카오에서 받아오는 사용자 정보를 담는 역할을 하는 클래스
@Getter
public class OAuthAttributes {
    // 사용자의 소셜 계정 정보
    private Map<String, Object> attributes;
    // 소셜계정 사용자의 이름이 저장 되는 키
    private String nameAttributeKey;
    // 사용자의 이메일 주소를 작성
    private String email;

    // 생성자
    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String email) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
    }

    // 생성자에서 전달 받은 정보를 필드에 저장하고 메서드를 통해 특정 소셜 계정 정보를 처리할 수 있도록 구성되어있다.
    public static OAuthAttributes of(String socialName, String userNameAttributeName, Map<String, Object> attributes) {
        // 카카오가 전달 되어서 카카오 계정의 정보를 처리함
        if ("kakao".equals(socialName)) {
            return ofKakao("id", attributes);
        }

        return null;
    }

    // 카카오 로그인 정보를 처리하는 곳
    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        // kakaoAcount key를 입력하여 값을 추출하여 이메일 정보를 가져와서 넣는다.
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        // 객체를 생성하고 이메일, 유저의 이름 키, 속성을 설정하여 반환한다.
        return OAuthAttributes.builder()
                .email((String) kakaoAccount.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }
    // OAuthAttributes 객체를 Wuser 객체로 변환하는 역할
    public com.ssafy.bora.entity.User toEntity() {
        return User.builder()
                .id(email)
                .role(Role.GUEST)
                .build();
    }
}
