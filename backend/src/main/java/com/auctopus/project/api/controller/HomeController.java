package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.UserService;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class HomeController {

    UserService userService;
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> TestCreate() {
        User user = userRepository.save(
                User.builder()
                        .email("wsb1017@naver.com")
                        .nickname("상빈상빈")
                        .userName("상빈")
                        .build()
        );

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
