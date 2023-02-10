package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.UserUpdateRequest;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.db.domain.User;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @PatchMapping()
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

