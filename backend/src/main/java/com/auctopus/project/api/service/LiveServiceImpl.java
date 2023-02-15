package com.auctopus.project.api.service;

import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.live.LiveNotFoundException;
import com.auctopus.project.common.exception.user.UserNotFoundException;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.repository.AuctionRepository;
import com.auctopus.project.db.repository.LiveRepository;
import com.auctopus.project.db.repository.UserRepository;
import java.sql.Timestamp;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LiveServiceImpl implements LiveService {

    private final RedisTemplate<String, String> redisTemplate;
    @Autowired
    UserRepository userRepository;
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
        User user = userRepository.findByEmail(auction.getUserEmail()).orElseThrow();
        Live live = Live.builder()
                .liveSeq(auctionSeq)
                .userEmail(auction.getUserEmail())
                .startTime(startTime)
                .endTime(Timestamp.valueOf(auctionTime.toLocalDateTime().plusHours(1)))
                .currentPrice(auction.getStartPrice())
                .build();
        liveRepository.save(live);

        redisTemplate.opsForValue()
                .set(auctionSeq + "Top", user.getNickname() + "-" + auction.getStartPrice());
        redisTemplate.opsForValue().set(auctionSeq + "CV", "0.999999999");

        // 경매방의 state를 진행중(2)로 바꾸어주자
        auction.setState(2);
    }

    @Override
    @Transactional
    public void registerAutoBidder(int liveSeq, String userEmail, int autoPrice) {
        String key = String.valueOf(liveSeq) + "autoBidder";
        double CV = Double.parseDouble(
                String.valueOf(redisTemplate.opsForValue().get(liveSeq + "CV")));
        redisTemplate.opsForZSet().add(key, userEmail, (double) autoPrice - CV);
        redisTemplate.opsForValue().set(key + "CV", String.valueOf(CV - 0.000000001));
    }

    @Override
    public String[] autoBidding(int liveSeq, String currBidder, String currPrice) {
        // 자동 경매 시스템 이용자들을 불러온다
        String key = String.valueOf(liveSeq) + "autoBidder";
        Set<ZSetOperations.TypedTuple<String>> autoBidderSet = redisTemplate.opsForZSet().
                reverseRangeWithScores(key, 0, -1);

        String finalBidder = currBidder;
        int finalPrice = Integer.parseInt(currPrice);
        Live live = getLiveInfo(liveSeq);
        int bidUnit = live.getBidUnit();
        if (autoBidderSet == null) {
            System.out.println("뀨!");
        } else if (autoBidderSet.size() == 1) {
            String firstBidder = currBidder;
            int firstPrice = 0;
            for (TypedTuple autoBidder : autoBidderSet) {
                firstBidder = String.valueOf(autoBidder.getValue());
                firstPrice = autoBidder.getScore().intValue();
            }
            if (finalPrice < firstPrice) {
                finalBidder = firstBidder;
                finalPrice += bidUnit;
            }
        } else {
            int rank = 1;
            String firstBidder = currBidder;
            int firstPrice = 0;
            int secondPrice = 0;
            for (TypedTuple autoBidder : autoBidderSet) {
                if (rank == 1) {
                    firstBidder = String.valueOf(autoBidder.getValue());
                    firstPrice = autoBidder.getScore().intValue();
                    rank++;
                } else {
                    secondPrice = autoBidder.getScore().intValue();
                    break;
                }
            }
            if (finalPrice < firstPrice) {
                finalBidder = firstBidder;
                if (firstPrice == secondPrice)
                    finalPrice = secondPrice + bidUnit;
                else
                    finalPrice = Math.max(finalPrice, secondPrice) + bidUnit;
            }
        }

        User user = userRepository.findByEmail(finalBidder).orElseThrow(
                () -> new UserNotFoundException("user with email not found",
                        ErrorCode.USER_NOT_FOUND));
        return new String[]{user.getNickname(), String.valueOf(finalPrice), finalBidder};
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

        String cvKey = String.valueOf(liveSeq) + "CV";
        String liveKey = String.valueOf(liveSeq) + "live";
        String autoBidderKey = String.valueOf(liveSeq) + "autoBidder";
        redisTemplate.delete(cvKey);
        redisTemplate.delete(liveKey);
        redisTemplate.delete(autoBidderKey);
//        ate.opsForZSet().removeRange(bidderKey, 0, -1);

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
        liveRepository.save(live);
    }


    @Override
    @Transactional
    public void decreaseViewer(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setViewer(live.getViewer() - 1);
        liveRepository.save(live);
    }

    @Override
    @Transactional
    public void increaseParticipant(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setParticipant(live.getParticipant() + 1);
        liveRepository.save(live);
    }

    @Override
    @Transactional
    public void decreaseParticipant(int liveSeq) {
        Live live = liveRepository.findByLiveSeq(liveSeq).orElseThrow(
                () -> new LiveNotFoundException("live with liveSeq " + liveSeq + " not found",
                        ErrorCode.LIVE_NOT_FOUND));
        live.setParticipant(live.getParticipant() - 1);
        liveRepository.save(live);
    }
}
