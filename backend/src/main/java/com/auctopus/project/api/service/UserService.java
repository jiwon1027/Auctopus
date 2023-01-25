package com.auctopus.project.api.service;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 유저 관련 로직 처리를 위한 서비스 구현
 */
@Service

public interface UserService {

    // 회원 정보 보기
    User getUserByUserSeq(int userSeq);

    // 회원 정보 수정
    void updateUserInfo(int userSeq, UserUpdateRequest req);

    // 회원 정보 삭제(DB에서)
    void deleteUser(int userSeq);

}
