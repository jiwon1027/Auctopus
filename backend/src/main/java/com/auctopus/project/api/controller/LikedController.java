package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.LikeAuctionService;
import com.auctopus.project.api.service.NotificationService;
import com.auctopus.project.db.domain.Auction;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @CrossOrigin("*")
    @PostMapping()
    public ResponseEntity<?> registerLikeAuction(Authentication authentication,
            @RequestBody Map<String, Integer> map) {
        int auctionSeq = map.get("auctionSeq");
        String userEmail = (String) authentication.getCredentials();
        boolean isLiked = likeAuctionService.creatLikeAuction(userEmail, auctionSeq);
        if (isLiked == false)
            notificationService.scheduleNotification(userEmail, auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{auctionSeq}")
    public ResponseEntity<?> cancelLikeAuction(Authentication authentication,
            @PathVariable("auctionSeq") int auctionSeq) {
        String userEmail = (String) authentication.getCredentials();
        boolean isLiked = likeAuctionService.deleteLikeAuction(userEmail, auctionSeq);
        if (isLiked == true)
            notificationService.cancelNotification(userEmail, auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> checkLikeOrNot(Authentication authentication,
            @PathVariable("auctionSeq") int auctionSeq) {
        String userEmail = (String) authentication.getCredentials();
        boolean isLiked = likeAuctionService.checkingExistence(userEmail, auctionSeq);
        return new ResponseEntity<>(isLiked, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping()
    public ResponseEntity<?> getLikeAuctionList(Authentication authentication) {
        String userEmail = (String) authentication.getCredentials();
        List<Auction> likeAuctionList = likeAuctionService.getLikeAuctionList(userEmail);
        return new ResponseEntity<>(likeAuctionList, HttpStatus.OK);
    }

}
