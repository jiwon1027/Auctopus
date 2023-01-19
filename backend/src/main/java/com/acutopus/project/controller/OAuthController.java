package com.acutopus.project.controller;

import com.acutopus.project.db.domain.User;
import com.acutopus.project.db.repository.UserRepository;
import com.acutopus.project.service.KakaoUserServiceImpl;
import com.acutopus.project.service.OAuthServiceimpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
@AllArgsConstructor
@CrossOrigin("*")
public class OAuthController {
    /*
    * 카카오 callback
    * 이거 원래 redict_url로 보내고 code를 받는건 FE에서 하는건데 지금 test용으로 그냥 BE에서 작성 중
    * code에서 나온 결과물로 email, nickname 조회가능 (from. kakao server)
    * */

    private OAuthServiceimpl oAuthServiceimpl;
    private KakaoUserServiceImpl kakaoUserServiceimpl;

    @GetMapping("/kakao")
    public void kakaoCallBack(@RequestParam String code){
        try{
            System.out.println("code : " +code);

            String access_token = oAuthServiceimpl.getKakaoAccessToken(code);

            System.out.println("access_token : "+ access_token);

            kakaoUserServiceimpl.createKakaoUser(access_token);


        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
