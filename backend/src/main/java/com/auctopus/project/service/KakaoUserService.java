package com.auctopus.project.service;

import java.util.HashMap;

public interface KakaoUserService {

    HashMap<String, Object> getKakaoAccessToken(String code);
    HashMap<String, Object> getKakaoUserInfo(String token) throws Exception;

    Boolean validationIdToken(String id_token);

}
