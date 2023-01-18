package com.acutopus.project.service;


import com.acutopus.project.db.domain.User;

public interface KakaoUserService {
    void createKakaoUser(String token) throws Exception;

}
