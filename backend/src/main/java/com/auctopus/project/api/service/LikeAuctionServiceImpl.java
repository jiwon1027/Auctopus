package com.auctopus.project.api.service;

import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.LikeAuction;
import com.auctopus.project.db.repository.AuctionRepository;
import com.auctopus.project.db.repository.LikeAuctionRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeAuctionServiceImpl implements LikeAuctionService {

    @Autowired
    private LikeAuctionRepository likeAuctionRepository;
    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    @Transactional
    public void creatLikeAuction(String userEmail, int auctionSeq) {
        LikeAuction likeAuction = LikeAuction.builder().userEmail(userEmail).auctionSeq(auctionSeq)
                .build();
        likeAuctionRepository.save(likeAuction);

        // 경매의 likeCount 증가
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auction.setLikeCount(auction.getLikeCount() + 1);
        auctionRepository.save(auction);
    }

    @Override
    public void deleteLikeAuction(String userEmail, int auctionSeq) {
        LikeAuction likeAuction = likeAuctionRepository.findByUserEmailAndAuctionSeq(userEmail,
                auctionSeq);
        likeAuctionRepository.delete(likeAuction);

        // 경매의 likeCount 감소
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auction.setLikeCount(auction.getLikeCount() - 1);
        auctionRepository.save(auction);
    }

    @Override
    public List<Auction> getLikeAuctionList(String userEmail) {
        List<LikeAuction> likeAuctionList = likeAuctionRepository.findLikeAuctionListByUserEmail(userEmail);
        List<Auction> auctionList = new ArrayList<>();
        for (LikeAuction likeauction : likeAuctionList) {
            int auctionSeq = likeauction.getAuctionSeq();
            Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                    () -> new AuctionNotFoundException(
                            "auction with auctionSeq " + auctionSeq + " not found",
                            ErrorCode.AUCTION_NOT_FOUND));
            auctionList.add(auction);
        }
        return auctionList;
    }

}
