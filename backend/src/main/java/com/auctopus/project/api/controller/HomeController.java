package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.UserService;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class HomeController {

    UserService userService;
    UserRepository userRepository;

//    @PostMapping("/test1")
//    public ResponseEntity<?> TestCreate() {
//        User user = userRepository.save(
//                User.builder()
//                        .email("wsb1017@naver.com")
//                        .nickname("상빈상빈")
//                        .userName("상빈")
//                        .build()
//        );
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//
//    @GetMapping("/test2")
//    public ResponseEntity<?> getUser(String email) {
//        User user = userService.getUser(email);
//        if (user == null)
//            throw new UserNotFoundException("유저를 찾을 수 없습니다.", ErrorCode.USER_NOT_FOUND);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
}
