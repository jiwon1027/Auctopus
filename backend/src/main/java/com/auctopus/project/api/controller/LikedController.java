package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.LikeAuctionService;
import com.auctopus.project.api.service.NotificationService;
import com.auctopus.project.db.domain.Auction;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/liked")
@CrossOrigin("*")
public class LikedController {

    @Autowired
    private LikeAuctionService likeAuctionService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping()
    public ResponseEntity<?> registerLikeAuction(Authentication authentication,
            @RequestBody String  auctionSeq) {
        int tmp = Integer.parseInt(auctionSeq);
        String userEmail = (String) authentication.getCredentials();
        likeAuctionService.creatLikeAuction(userEmail, tmp);
        System.out.println("여여기기느는 왔왔다고!!!222!!!");
        notificationService.scheduleNotification(userEmail, tmp);
        System.out.println("여여기기느는 왔왔다고!!!333!!!");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping()
    public ResponseEntity<?> cancelLikeAuction(Authentication authentication,
            @RequestBody int auctionSeq) {
        String userEmail = (String) authentication.getCredentials();
        likeAuctionService.deleteLikeAuction(userEmail, auctionSeq);
        notificationService.cancelNotification(userEmail, auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping()
    public ResponseEntity<?> getLikeAuctionList(Authentication authentication) {
        String userEmail = (String) authentication.getCredentials();
        List<Auction> likeAuctionList = likeAuctionService.getLikeAuctionList(userEmail);
        return new ResponseEntity<>(likeAuctionList, HttpStatus.OK);
    }
}
