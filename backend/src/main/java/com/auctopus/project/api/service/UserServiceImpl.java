package com.auctopus.project.api.service;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserByUserSeq(int userSeq) {
        User user = userRepository.findByUserSeq(userSeq);
        if (user == null) {
            throw new UserNotFoundException("user with seq " + userSeq + " not found",
                    ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }

    @Override
    public void updateUserInfo(int userSeq, UserUpdateRequest req) {
        User user = userRepository.findByUserSeq(userSeq);
        if (user == null) {
            throw new UserNotFoundException("user with seq " + userSeq + " not found",
                    ErrorCode.USER_NOT_FOUND);
        }
        user.setUserName(req.getUserName());
        user.setBankCode(req.getBankCode());
        user.setAccount(req.getAccount());
        user.setAddress(req.getAddress());
        user.setProfileUrl(req.getProfileUrl());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(int userSeq) {
        User user = userRepository.findByUserSeq(userSeq);
        if (user == null) {
            throw new UserNotFoundException("user with seq " + userSeq + " not found",
                    ErrorCode.USER_NOT_FOUND);
        }
        userRepository.delete(user);
    }


}
