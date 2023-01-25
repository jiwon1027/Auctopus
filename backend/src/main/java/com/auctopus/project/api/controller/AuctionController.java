package com.auctopus.project.api.controller;

import com.auctopus.project.api.service.AuctionServiceImpl;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.repository.AuctionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private AuctionServiceImpl auctionServiceImpl;
    @Autowired
    private AuctionRepository auctionRepository;

    @GetMapping("/")
    public String auction(@RequestParam(value = "id") Long id, Model model) {
        model.addAttribute("auction", auctionServiceImpl.findAuctionById(id));
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
        updateAuction.setCategorySeq(auction.getCategorySeq());
        updateAuction.setContent(auction.getContent());
        updateAuction.setStartTime(auction.getStartTime());
        auctionRepository.save(updateAuction);

        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable("id") Long id) {
        auctionRepository.deleteById(id);
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getAuctionList(@RequestParam(value="word", required = false) String word, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort) {
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        Boolean hasMore = false;
        if ("main".equals(sort)) {
            // 열리기 까지 하루 남은 경매방 - 임박한 순으로 나열)
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionServiceImpl.getAuctionListToday(pageable);
            hasMoreList = auctionServiceImpl.getAuctionListToday(PageRequest.of(page+1,size));
        } else if ("startTime".equals(sort)) {
            // 경매 임박순 (시작안한 경매방 곧 열릴 순으로 정렬)
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
            auctionList = auctionServiceImpl.getAuctionListByStartTime(word, pageable);
            hasMoreList = auctionServiceImpl.getAuctionListByStartTime(word,PageRequest.of(page+1, size, Sort.by(sort).ascending()));
        } else {
            //최신 등록순 (시작안한 경매방 나중에 열릴순으로 정렬)
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
            auctionList = auctionServiceImpl.getAuctionListByStartTime(word, pageable);
            hasMoreList = auctionServiceImpl.getAuctionListByStartTime(word, PageRequest.of(page+1, size, Sort.by(sort).descending()));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {

        }
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }
}
