package com.auctopus.project.controller;

import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import com.auctopus.project.service.KakaoUserServiceImpl;
import java.util.Base64;
import java.util.HashMap;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kakao")
@AllArgsConstructor
@CrossOrigin("*")
public class KakaoUserController {
    /*
    * 유의사항 : 인가코드로 발급받은 access_token은 jwt가 아님, 그저 카카오서버랑 통신하여 kakaoUserInfo를 받아오기 위한 token일 뿐
    * OpenID Connect로 발급한 id_token이 우리가 이해하고 있는 JWT token이다(실제로 디버깅해보면 정보들 다 들어있음)
    * id_token을 가지고 FE와 통신하면 되는데
    *
    *
    * */

    private KakaoUserServiceImpl kakaoUserServiceimpl;
    private UserRepository userRepository;

    @GetMapping("/login")
    public ResponseEntity<HashMap<String, Object>> kakaoLogin(@RequestParam String code){
        HashMap<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            // 인가코드 받아서 access_token(kakao server), id_token 발급
            System.out.println("code : " +code);
            HashMap<String, Object> tokenInfo = kakaoUserServiceimpl.getKakaoAccessToken(code);

            String access_token = (String) tokenInfo.get("access_token");
            String id_token = (String) tokenInfo.get("id_token");

            // 발급받은 access_token(kakao server) 받아서 id_token, kakaoUserInfo(email, nickname) 가져오기
            System.out.println("id_token : "+ id_token);
            System.out.println("accessa_token : " + access_token);

            HashMap<String, Object> kakaoUserInfo= kakaoUserServiceimpl.getKakaoUserInfo(access_token);

            // email이 현재 DB에 저장있지 않으면 DB에 저장
            if(userRepository.findByEmail((String)kakaoUserInfo.get("email")).isEmpty()){
                System.out.println("DB 저장");
                userRepository.save(User.builder()
                        .email((String) kakaoUserInfo.get("email"))
                        .nickname((String) kakaoUserInfo.get("nickname"))
                        .build());
            }

            kakaoUserServiceimpl.validationIdToken(id_token);


            resultMap.put(("token"), id_token);
            resultMap.put(("message"), "토큰 발급 완료");
            status = HttpStatus.OK;

        }catch (Exception e){
            e.printStackTrace();
            resultMap.put(("message"), e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<HashMap<String, Object>>(resultMap, status);
    }

}
