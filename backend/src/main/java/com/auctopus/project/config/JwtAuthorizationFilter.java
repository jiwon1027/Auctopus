package com.auctopus.project.config;

import com.auctopus.project.api.service.UserService;
import com.auctopus.project.api.service.UserServiceImpl;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import com.auth0.jwk.InvalidPublicKeyException;
import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.Reader;
import java.security.interfaces.RSAPublicKey;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;


public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    // JwtProvider Singleton으로 생성함, 새로 만들어서 계속 요청하면 트래픽 걸릴 것 같아서
    private static final JwkProvider provider = new JwkProviderBuilder("https://kauth.kakao.com")
            .cached(10, 7, TimeUnit.DAYS) // 7일간 최대 10개 캐시
            .build();


    private UserService userService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }



    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain chain) throws IOException, ServletException {
//        super.doFilterInternal(request, response, chain);

        String jwtHeader = request.getHeader("Authorization");

        if (jwtHeader == null){
            chain.doFilter(request, response);
            return;
        }

        String idToken = jwtHeader.replace("Bearer ", "");

        try {
            // If header is present, try grab user principal from database and perform authorization
            Authentication authentication = getAuthentication(idToken);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            return;
        }

        chain.doFilter(request, response);
        System.out.println("SecurityContextHolder 설정 완료");

    }
    @Transactional(readOnly = true)
    public Authentication getAuthentication(String idToken){

        try {
            // 1. 검증없이 디코딩
            DecodedJWT jwtOrigin = JWT.decode(idToken);

            // 2. 공개키 프로바이더 준비
            Jwk jwk = provider.get(jwtOrigin.getKeyId());

            // 3. 검증 및 디코딩
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(idToken);

            String nickname = String.valueOf(jwt.getClaims().get("nickname")).replace("\"","");
            String email = String.valueOf(jwt.getClaims().get("email")).replace("\"","");

            System.out.println(nickname);
            System.out.println(email);



            if (!nickname.equals("null") && !email.equals("null")){
                User user_nickname = userService.getUserByNickname(nickname);
                User user_email = userService.getUserByEmail(email);

                if (user_nickname != null  && user_email != null){
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(nickname, email);
                    jwtAuthentication.setDetails(new User());

                    return jwtAuthentication;
                }
            }

        } catch (Exception e) {
            System.out.println("ERROR : JwkException ");
        }

        return null;
    }


}
