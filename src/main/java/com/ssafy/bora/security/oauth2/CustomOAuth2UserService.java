package com.ssafy.bora.security.oauth2;

import com.ssafy.bora.entity.PrivacyUser;
import com.ssafy.bora.repository.privacy.PrivacyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final PrivacyRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        log.info("oauth provider: {}", registrationId);

        CustomOAuth2User customOAuth2User = new KakaoOAuth2User(
                oAuth2User.getAttributes(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                "id"
        );


        PrivacyUser user = saveOrUpdate(customOAuth2User);
        log.info("oauth login success - user : {}", user);

//        return new DefaultOAuth2User(
//                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
//                oAuth2User.getAttributes(),
//                "id");
        return customOAuth2User;
    }

    private PrivacyUser saveOrUpdate(CustomOAuth2User oAuth2User) {
        PrivacyUser user = PrivacyUser.of(oAuth2User);
        userRepository.findByEmail(user.getEmail()).ifPresent(entity -> user.setId(entity.getId()));
        return userRepository.save(user);
    }
}
