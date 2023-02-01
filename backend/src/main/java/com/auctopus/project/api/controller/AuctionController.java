package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.CategoryService;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.domain.Auction;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auction")
@CrossOrigin("*")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryService categoryService;

    @PostMapping()
    public ResponseEntity<?> registerAuction(@RequestBody AuctionCreateRequest req) {
        auctionService.createAuction(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping()
    public ResponseEntity<?> updateAuction(@RequestBody AuctionUpdateRequest req) {
        Auction auction = auctionService.getAuction(req.getAuctionSeq());
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        else {
            auctionService.updateAuction(req);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/{auctionSeq}")
    public ResponseEntity<?> deleteAuction(@PathVariable("auctionSeq") int auctionSeq) {
        Auction auction = auctionService.getAuction(auctionSeq);
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        else {
            auctionService.deleteAuction(auctionSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> getAuctionInfo(@PathVariable("auctionSeq") int auctionSeq) {
        Auction auction = auctionService.getAuction(auctionSeq);
        User user = userService.getUser(auction.getUserEmail());
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        Map<String, Object> res = new HashMap<>();
        res.put("profileUrl", user.getProfileUrl());
        res.put("nickname", user.getNickname());
        res.put("userEmail", auction.getUserEmail());
        res.put("category", categoryService.getCategoryName(auction.getCategorySeq()));
        res.put("title", auction.getTitle());
        res.put("content", auction.getContent());
        res.put("startTime", auction.getStartTime());
        res.put("startPrice", auction.getStartPrice());
        res.put("likeCount", auction.getLikeCount());
        res.put("state", auction.getState());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}
