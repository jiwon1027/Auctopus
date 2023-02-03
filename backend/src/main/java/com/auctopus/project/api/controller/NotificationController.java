package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.NotificationService;
import com.auctopus.project.db.domain.Notification;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping()
    public ResponseEntity<?> getNotificationList(Authentication authentication) {
        String userEmail = (String) authentication.getCredentials();
        List<Notification> res = notificationService.getNotificationList(userEmail);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{notificationSeq}")
    public ResponseEntity<?> deleteNotification(Authentication authentication,
            @PathVariable("notificationSeq") int notificationSeq) {
        String userEmail = (String) authentication.getCredentials();
        notificationService.deleteNotification(userEmail, notificationSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
