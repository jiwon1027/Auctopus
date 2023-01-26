package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.auctopus.project.db.domain.Auction;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;


    @Override
    public Auction getAuction(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        return auction;
    }

    @Override
    @Transactional
    public void updateAuction(int auctionSeq, AuctionUpdateRequest req) {
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
}
