package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.repository.AuctionRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
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
    public void createAuction(AuctionCreateRequest req) {
        Auction auction = Auction.builder()
                .userEmail(req.getUserEmail())
                .categorySeq(req.getCategorySeq())
                .title(req.getTitle())
                .content(req.getContent())
                .startTime(Timestamp.valueOf(req.getStartTime()))
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
        auction.setStartTime(Timestamp.valueOf(req.getStartTime()));
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
    public List<Auction> getMyAuctionListByEmail(String email) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByEmail(email);
        return auctionList;
    }
    @Override
    public List<Auction> getAuctionListByViewer(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByViewer(state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByLikeCount(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByLikeCount(state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByCategorySeq(int likeCategorySeq, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAuctionByCategorySeq(likeCategorySeq, state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByTime(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByStartTime(state);
        return auctionList;
    }

    // 검색 경매
    @Override
    public List<Auction> getAuctionListByViewerAndWord(String word, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByViewerAndWord(word, state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByLikeCountAndWord(String word, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByLikeCountAndWord(word, state);
        return auctionList;
    }


    // 카테고리 경매
    @Override
    public List<Auction> getAuctionListByViewerAndCategory(int categorySeq, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByViewerAndCategory(categorySeq, state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByLikeCountAndCategory(int categorySeq, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByLikeCountAndCategory(categorySeq, state);
        return auctionList;
    }
}
