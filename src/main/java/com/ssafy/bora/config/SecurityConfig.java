package com.ssafy.bora.config;

import com.ssafy.bora.repository.privacy.IPrivacyRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.security.jwt.*;
import com.ssafy.bora.security.oauth2.CustomOAuth2UserService;
import com.ssafy.bora.security.oauth2.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity // 보안 관련 어노테이션
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider; // 웹토큰 공급자
    private final CustomOAuth2UserService customOAuth2UserService; // 인증을 위한 서비스
    private final JwtFilter jwtFilter; //JWT 인증용 필터
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; //인증을 위한 진입점
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler; //JWT 인증 중 액세스 거부
    private final JwtExceptionFilter jwtExceptionFilter; // JWT 인증 중 예외 처리를 위한 필터
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler; // Handler의 인스턴스를 반환
    private final IPrivacyRepository iPrivacyRepository;

    private final IUserRepository userRepository;

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new OAuth2LoginSuccessHandler(iPrivacyRepository, jwtProvider, userRepository);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CORS 허용 설정
                .cors()

                .and()
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable() // FormLogin 사용하지않음


                // URL 권한 설정
//                .and()
                .authorizeRequests()
//                .antMatchers(HttpMethod.GET, "/api/auth/users").authenticated()
                //.antMatchers(HttpMethod.PUT, "/api/auth/stores").authenticated()
                .antMatchers(HttpMethod.POST, "/api/reviews").authenticated()
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutUrl("/api/auth/logout")
                .permitAll()


                // JWT 설정
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtFilter.class)

                // 예외 설정
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않으므로 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 소셜 로그인 설정
                .and()
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)// 동의하고 계속하기를 눌렀을때,
                .userInfoEndpoint()
                .userService(customOAuth2UserService);// userService 설정

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // 허용할 URL
        config.addAllowedHeader("*"); // 허용할 Header
        config.addAllowedMethod("*"); // 허용할 Http Method
        config.addExposedHeader("*");


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
