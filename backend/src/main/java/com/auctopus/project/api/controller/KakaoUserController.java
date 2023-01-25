package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.KakaoUserServiceImpl;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
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
    * 카카오 callback
    * 이거 원래 redict_url로 보내고 code를 받는건 FE에서 하는건데 지금 test용으로 그냥 BE에서 작성 중
    * code에서 나온 결과물로 email, nickname 조회가능 (from. kakao server)
    * */

    private KakaoUserServiceImpl kakaoUserServiceimpl;
    private UserRepository userRepository;

    @GetMapping("/login")
    public ResponseEntity<HashMap<String, Object>> kakaoLogin(@RequestParam String code){
        HashMap<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            // 인가코드 받아서 토큰 발급
            System.out.println("code : " +code);
            HashMap<String, Object> tokenInfo = kakaoUserServiceimpl.getKakaoAccessToken(code);

            String access_token = (String) tokenInfo.get("access_token");
            String id_token = (String) tokenInfo.get("id_token");

            // 발급받은 access_token 받아서 kakaoUserInfo(email, nickname) 가져오기
            System.out.println("id_token : "+ id_token);
            HashMap<String, Object> kakaoUserInfo= kakaoUserServiceimpl.getKakaoUserInfo(access_token);

            // email이 현재 DB에 저장있지 않으면 DB에 저장
            if(userRepository.findByEmail((String)kakaoUserInfo.get("email")).isEmpty()){
                userRepository.save(User.builder()
                        .email((String) kakaoUserInfo.get("email"))
                        .nickname((String) kakaoUserInfo.get("nickname"))
                        .build());
            }


            resultMap.put(("token"), id_token);
            resultMap.put(("message"), "토큰 발급 완료");
            status = HttpStatus.OK;

        }catch (Exception e){
            resultMap.put(("message"), e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<HashMap<String, Object>>(resultMap, status);
    }

}
