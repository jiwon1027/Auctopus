package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.db.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원 정보 조회
    @CrossOrigin("*")
    @GetMapping()
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        String userEmail = (String) authentication.getCredentials();
        User user = userService.getUser(userEmail);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PutMapping()
    public ResponseEntity<?> updateUserInfo(Authentication authentication,
            @RequestBody UserUpdateRequest req) {
        String userEmail = (String) authentication.getCredentials();
        userService.updateUserInfo(userEmail, req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping()
    public ResponseEntity<?> deleteUser(Authentication authentication) {
        String userEmail = (String) authentication.getCredentials();
        userService.deleteUser(userEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

