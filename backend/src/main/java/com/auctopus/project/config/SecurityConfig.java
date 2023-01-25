package com.auctopus.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration //메모리에 그냥 떠야하니까
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .httpBasic().disable()
                .csrf().disable() //csrf 비활성화
                .addFilter(new JwtAuthorizationFilter(authenticationManager())); //인증필터 거쳐야함, 유효성 검사 Filter
        
        httpSecurity.authorizeRequests()
                .antMatchers("/user/**").authenticated() //user뒤에 오는애들은 인증을 할꺼라는 의미, 실제로 로그인 안하면 403이 뜸
                .anyRequest().permitAll();
                
                

//                .and()
//                .oauth2Login()
//                .loginPage("/kakao/login");
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

//        configuration.addAllowedOrigin("*");
//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedOrigin("https://test.ssafy.io:3000");
//        configuration.addAllowedOrigin("https://test.ssafy.io");
        configuration.setAllowCredentials(true); // 내서버가 응답을 하면 json을 js에서 처리할 수 있게 함
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}