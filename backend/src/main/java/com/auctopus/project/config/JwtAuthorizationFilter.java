package com.auctopus.project.config;

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
import java.util.concurrent.TimeUnit;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    // JwtProvider Singleton으로 생성함, 새로 만들어서 계속 요청하면 트래픽 걸릴 것 같아서
    private static final JwkProvider provider = new JwkProviderBuilder("https://kauth.kakao.com")
            .cached(10, 7, TimeUnit.DAYS) // 7일간 최대 10개 캐시
            .build();

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }


    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        super.doFilterInternal(request, response, chain);

        System.out.println("인증이나 권한이 필요한 주소 요청이 됨");
        String jwtHeader = request.getHeader("Authorization");
        System.out.println("jwtHeader : " + jwtHeader);

        String idToken = jwtHeader.replace("Bearer ", "");

        Jwk jwk = null;
        Algorithm algorithm = null;

        try {
            // 1. 검증없이 디코딩
            DecodedJWT jwtOrigin = JWT.decode(idToken);
            System.out.println("jwtOrigin : " +  jwtOrigin);

            // 2. 공개키 프로바이더 준비
            jwk = provider.get(jwtOrigin.getKeyId());
            System.out.println("공개키 프로바이더 : "+jwk);

            // 3. 검증 및 디코딩
            algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(idToken);
            System.out.println("jwt : "+ jwt);
            System.out.println("========================");
            System.out.println(jwt.getSubject());
            System.out.println(jwt.getPayload());
            System.out.println(jwt.getIssuer());
            System.out.println(jwt.getClaims());

            System.out.println(jwt.getClaims().get("nickname"));
            System.out.println(jwt.getClaims().get("email"));


        } catch (Exception e) {
            System.out.println("ERROR : JwkException ");
            e.printStackTrace();
        }


    }
}
