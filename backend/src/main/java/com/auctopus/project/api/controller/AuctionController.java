package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.db.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private AuctionRepository auctionRepository;

//    @Autowired
//    private AuctionImageService auctionImageService;

    // 수정 필요
//    @GetMapping("/")
//    public String auction(@RequestParam(value = "id") Long id, Model model) {
//        model.addAttribute("auction", auctionService.findAuctionById(id));
//        return "/auction";

    @PostMapping
    public ResponseEntity<?> registerAuction(@RequestBody Auction auction) {
        auctionRepository.save(auction);
        return new ResponseEntity<>("{}", HttpStatus.CREATED);
    }

    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> auction(@PathVariable("auctionSeq") int auctionSeq) {
        Auction auction = auctionService.getAuction(auctionSeq);
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        return new ResponseEntity<>(auction, HttpStatus.OK);
    }

    @PatchMapping("/{auctionSeq}")
    public ResponseEntity<?> putAuction(@PathVariable("auctionSeq") int auctionSeq,
            @RequestBody AuctionUpdateRequest req) {
        Auction auction = auctionService.getAuction(auctionSeq);
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        else {
            auctionService.updateAuction(auctionSeq, req);
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
}
