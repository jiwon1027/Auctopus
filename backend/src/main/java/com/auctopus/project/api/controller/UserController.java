package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원 정보 조회
    @GetMapping("/{userSeq}")
    public ResponseEntity<?> getUserInfo(@PathVariable int userSeq) {
        User user = userService.getUserByUserSeq(userSeq);
        if (user == null)
            throw new UserNotFoundException("유저를 찾을 수 없습니다.", ErrorCode.USER_NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userSeq}")
    @Transactional
    public ResponseEntity<?> updateUserInfo(@PathVariable int userSeq,
            @RequestBody UserUpdateRequest req) {
        User user = userService.getUserByUserSeq(userSeq);
        if (user == null)
            throw new UserNotFoundException("유저를 찾을 수 없습니다.", ErrorCode.USER_NOT_FOUND);
        else {
            userService.updateUserInfo(userSeq, req);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/{userSeq}")
    @Transactional
    public ResponseEntity<?> deleteUser(@PathVariable int userSeq) {
        User user = userService.getUserByUserSeq(userSeq);
        if (user == null)
            throw new UserNotFoundException("유저를 찾을 수 없습니다.", ErrorCode.USER_NOT_FOUND);
        else {
            userService.deleteUser(userSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }
}
