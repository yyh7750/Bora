package com.ssafy.bora.security.oauth2;

import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.user.IUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final IUserRepository userRepository;

    // OAuth2 인증을 위한 사용자 정보를 로드하는데 사용한다.
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        
        // OAuth 공급자로 부터 기본 사용자 정보를 가져오기 위해 메서드 호출
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // registraion 및 userNameAttributeName을 검색한다.
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져옴
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // 기본 사용자 정보가 OAuthAttributes.of 메서드로 전달되어 객체 생성
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        log.info("CustomOAuth2UserService");
        // 사용자 정보를 저장하거나 업데이트한다.
        User user = saveOrUpdate(attributes);
        log.info("========" + user.getId() + " " + user.getRole() + " " + user.getId() + "========");
        
        return new CustomOAuth2User(
                // 사용자의 역할을 나타내는 단일 개체를 포함하는 컬렉션을 만든다.
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getKey())),
                // 사용자의 속성 반환
                attributes.getAttributes(),
                attributes.getNameAttributeKey(),
                user.getId(),
                user.getRole()
        );
    }

    // OAuthAttributes 개체를 인수로 사용하여 호출된다.
    // 로컬 데이터베이스에 사용자 정보를 저장하거나 업데이트 한다.
    private User saveOrUpdate(OAuthAttributes oAuthAttributes){
        User user = oAuthAttributes.toEntity();
        Optional<User> loadUser = userRepository.findById(user.getId());

        // 이 객체에는 사용자의 역할, 속성, 고유 식별자, 이메일 및 역할이 포함된다.
        if (loadUser.isEmpty()){ // 가입된 이메일이 없다면 저장하고
            return userRepository.save(user);
        } else if(loadUser.get().isDelete() == true){
            loadUser.get().renewUser();
            return loadUser.get();
        }else { // 있으면 가져온다.
            return loadUser.get();
        }
    }

}

