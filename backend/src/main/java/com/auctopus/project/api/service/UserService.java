package com.auctopus.project.api.service;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.db.domain.User;

/**
 * 유저 관련 로직 처리를 위한 서비스 구현
 */
public interface UserService {

    // 회원 정보 보기
    User getUser(String email);

    User getUserByNickname(String nickname);

    // 회원 정보 수정
    void updateUserInfo(String email, UserUpdateRequest req);

    // 회원 정보 삭제(DB에서)
    void deleteUser(String email);

}
