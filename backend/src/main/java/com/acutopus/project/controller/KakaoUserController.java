package com.acutopus.project.controller;

import com.acutopus.project.db.domain.User;
import com.acutopus.project.db.repository.UserRepository;
import com.acutopus.project.service.KakaoUserServiceImpl;
import java.util.HashMap;
import lombok.AllArgsConstructor;
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
    public void kakaoLogin(@RequestParam String code){
        try{
            // 인가코드 받아서 토큰 발급
            System.out.println("code : " +code);
            String access_token = kakaoUserServiceimpl.getKakaoAccessToken(code);

            // 발급받은 access_token 받아서 kakaoUserInfo(email, nickname) 가져오기
            System.out.println("access_token : "+ access_token);
            HashMap<String, Object> kakaoUserInfo= kakaoUserServiceimpl.getKakaoUserInfo(access_token);

            // email이 현재 DB에 저장있지 않으면 DB에 저장
//            if(userRepository.findByEmail((String)kakaoUserInfo.get("email")).isPresent()){
//                userRepository.save(User.builder()
//                        .email((String) kakaoUserInfo.get("email"))
//                        .nickname((String) kakaoUserInfo.get("nickname"))
//                        .build());
//            }



        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
