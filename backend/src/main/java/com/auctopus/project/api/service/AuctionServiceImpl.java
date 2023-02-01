package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.repository.AuctionRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.auctopus.project.db.domain.Auction;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    @Transactional
    public void createAuction(AuctionCreateRequest req) {
        Auction auction = Auction.builder()
                .userEmail(req.getUserEmail())
                .categorySeq(req.getCategorySeq())
                .title(req.getTitle())
                .content(req.getContent())
                .startTime(req.getStartTime())
                .startPrice(req.getStartPrice())
                .link("")
                .build();
        auctionRepository.save(auction);
    }

    @Override
    @Transactional
    public void updateAuction(AuctionUpdateRequest req) {
        int auctionSeq = req.getAuctionSeq();
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auction.setCategorySeq(req.getCategorySeq());
        auction.setTitle(req.getTitle());
        auction.setContent(req.getContent());
        auction.setStartTime(req.getStartTime());
        auction.setStartPrice(req.getStartPrice());
        auctionRepository.save(auction);
    }

    @Override
    @Transactional
    public void deleteAuction(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auctionRepository.delete(auction);
    }


    @Override
    public Auction getAuction(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        return auction;
    }

    @Override
    public List<Auction> getAuctionListByStartTime(String word, Pageable pageable) {
        List<Auction> auctionList = null;
        String currentTime = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (word == null) {
            word = "";
        }
        auctionList = auctionRepository.findAllByTitleContainsOrContentContains(word, currentTime,
                pageable);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByCategorySeq(int likeCategorySeq, Pageable pageable) {
        List<Auction> auctionList = null;
        String currentTime = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        auctionList = auctionRepository.findAuctionByCategorySeq(likeCategorySeq, currentTime,
                pageable);
        return auctionList;
    }

}
