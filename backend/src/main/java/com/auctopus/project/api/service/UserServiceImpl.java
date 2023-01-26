package com.auctopus.project.api.service;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("user with email " + email + " not found",
                        ErrorCode.USER_NOT_FOUND));
        return user;
    }

    @Override
    public User getUserByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname).orElseThrow(
                () -> new UserNotFoundException("user with email " + nickname + " not found",
                        ErrorCode.USER_NOT_FOUND));
        return user;
    }

    @Override
    @Transactional
    public void updateUserInfo(String email, UserUpdateRequest req) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("user with email " + email + " not found",
                        ErrorCode.USER_NOT_FOUND));
        user.setUserName(req.getUserName());
        user.setBankCode(req.getBankCode());
        user.setAccount(req.getAccount());
        user.setAddress(req.getAddress());
        user.setProfileUrl(req.getProfileUrl());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("user with email " + email + " not found",
                        ErrorCode.USER_NOT_FOUND));
        userRepository.delete(user);
    }

}
