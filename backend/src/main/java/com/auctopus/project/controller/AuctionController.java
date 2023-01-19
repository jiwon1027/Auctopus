package com.auctopus.project.controller;

import com.acutopus.project.db.domain.Auction;
import com.acutopus.project.db.repository.AuctionRepository;
import com.acutopus.project.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auction")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;
    @Autowired
    private AuctionRepository auctionRepository;

    @GetMapping("/")
    public String auction(@RequestParam(value="id") Long id, Model model) {
        model.addAttribute("auction", auctionService.findAuctionById(id));
        return "/auction";
    }

    @PostMapping
    public ResponseEntity<?> postAuction(@RequestBody Auction auction) {
        auctionRepository.save(auction);
        return new ResponseEntity<>("{}", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putAuction(@PathVariable("id") Long id, @RequestBody Auction auction) {
        Auction updateAuction = auctionRepository.getReferenceById(id);
        updateAuction.setTitle(auction.getTitle());
        updateAuction.setPrice(auction.getPrice());
        updateAuction.setCategory_seq(auction.getCategory_seq());
        updateAuction.setContent(auction.getContent());
        updateAuction.setStart_time(auction.getStart_time());
        auctionRepository.save(updateAuction);

        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable("id") Long id) {
        auctionRepository.deleteById(id);
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }
}
