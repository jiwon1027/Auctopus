package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.LikeAuctionService;
import com.auctopus.project.db.domain.Auction;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping()
    public ResponseEntity<?> registerLikeAuction(@RequestBody String userEmail,
            @RequestBody int auctionSeq) {
        likeAuctionService.creatLikeAuction(userEmail, auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<?> cancelLikeAuction(@RequestBody String userEmail,
            @RequestBody int auctionSeq) {
        likeAuctionService.deleteLikeAuction(userEmail, auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getLikeAuctionList(@RequestBody String userEmail) {
        List<Auction> likeAuctionList = likeAuctionService.getLikeAuctionList(userEmail);
        return new ResponseEntity<>(likeAuctionList, HttpStatus.OK);
    }

}
