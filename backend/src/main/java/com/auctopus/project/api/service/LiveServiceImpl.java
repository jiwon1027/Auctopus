package com.auctopus.project.api.service;

import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.live.LiveNotFoundException;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.repository.AuctionRepository;
import com.auctopus.project.db.repository.LiveRepository;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveServiceImpl implements LiveService {

    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private LiveRepository liveRepository;

    @Override
    @Transactional
    public void createLive(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        Timestamp auctionTime = auction.getStartTime();
        Timestamp currTime = new Timestamp(System.currentTimeMillis());
        Timestamp startTime = auctionTime.before(currTime) ? currTime : auctionTime;
        Live live = Live.builder()
                .liveSeq(auctionSeq)
                .userEmail(auction.getUserEmail())
                .startTime(startTime)
                .endTime(Timestamp.valueOf(auctionTime.toLocalDateTime().plusHours(1)))
                .currentPrice(auction.getStartPrice())
                .build();
        liveRepository.save(live);

        // 경매방의 state를 진행중(2)로 바꾸어주자
        auction.setState(2);
    }

    @Override
    @Transactional
    public void updateTopBidderInfo(String userEmail, int liveSeq, int newPrice) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setCurrentPrice(newPrice);
        live.setTopBidder(userEmail);
    }

    @Override
    @Transactional
    public void deleteLive(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        liveRepository.delete(live);

        // 경매방의 state를 끝(3)로 바꾸어주자
        Auction auction = auctionRepository.findByAuctionSeq(liveSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + liveSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auction.setState(3);
        auctionRepository.save(auction);
    }

    // 한 개의 라이브 정보 보기
    @Override
    public Live getLiveInfo(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        System.out.println(live);
        return live;
    }

    @Override
    @Transactional
    public void increaseViewer(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setViewer(live.getViewer() + 1);
    }

    @Override
    @Transactional
    public void decreaseViewer(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setViewer(live.getViewer() - 1);
    }

    @Override
    @Transactional
    public void increaseParticipant(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setParticipant(live.getParticipant() + 1);
    }

    @Override
    @Transactional
    public void decreaseParticipant(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setParticipant(live.getParticipant() - 1);
    }
}
