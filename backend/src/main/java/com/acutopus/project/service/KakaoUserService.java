package com.acutopus.project.service;


import com.acutopus.project.db.domain.User;
import java.util.HashMap;

public interface KakaoUserService {

    String getKakaoAccessToken(String code);

    HashMap<String, Object> getKakaoUserInfo(String token) throws Exception;

}
