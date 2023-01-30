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
    private LiveRepository liveRepository;

    @Override
    @Transactional
    public void creataLive(int auctionSeq, String userEmail) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        Timestamp auctionTime = Timestamp.valueOf(auction.getStartTime());
        Timestamp currTime = new Timestamp(System.currentTimeMillis());
        Timestamp startTime = auctionTime.before(currTime) ? currTime : auctionTime;
        Live live = Live.builder()
                .liveSeq(auctionSeq)
                .userEmail(userEmail)
                .startTime(startTime)
                .endTime(Timestamp.valueOf(auctionTime.toLocalDateTime().plusHours(1)))
                .price(auction.getStartPrice())
                .build();
        liveRepository.save(live);
    }

    // 한 개의 라이브 정보 보기
    @Override
    public Live getLive(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
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
