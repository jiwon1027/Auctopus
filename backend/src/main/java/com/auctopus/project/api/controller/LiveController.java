package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.LiveEnterRequest;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.LiveService;
import com.auctopus.project.api.service.LiveViewerService;
import com.auctopus.project.db.domain.Live;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/live")
public class LiveController {

    @Autowired
    private LiveService liveService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private LiveViewerService liveViewerService;
    // 자동 경매 시스템 사용자 중에 가장 높은 금액을 제시한 사람을 저장할 Map
    private Map<Integer, Object[]> allLiveTopAutoBidder = new HashMap<>();

    @CrossOrigin("*")
    @PostMapping("/open")
    public ResponseEntity<?> openLive(Authentication authentication,
            @RequestBody Map<String, Integer> map) {
        String userEmail = (String) authentication.getCredentials();
        int auctionSeq = map.get("auctionSeq");
        if (!userEmail.equals(auctionService.getAuction(auctionSeq).getUserEmail()))
            return new ResponseEntity<>("라이브를 생성할 권한이 없습니다.", HttpStatus.BAD_REQUEST);
        liveService.createLive(auctionSeq);

        // Map에 초기 TopAutoBidder 정보는 판매자 본인을 넣어주자
        Object[] info = {auctionService.getAuction(auctionSeq).getUserEmail(), 0};
        allLiveTopAutoBidder.put(auctionSeq, info);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PostMapping("/enter")
    public ResponseEntity<?> enterLive(Authentication authentication,
            @RequestBody LiveEnterRequest req) {
        String userEmail = (String) authentication.getCredentials();
        int liveSeq = req.getLiveSeq();
        int autoPrice = req.getAutoPrice();

        liveViewerService.createLiveViewer(userEmail, liveSeq, autoPrice);
        liveService.increaseViewer(liveSeq);

        // 자동 경매 시스템 사용자라면 경매 참여자도 1 늘려주고, TopAutoBidder 정보도 갱신하자
        if (autoPrice != 0) {
            liveService.increaseParticipant(liveSeq);
            int currTopAutoPrice = (int) allLiveTopAutoBidder.get(liveSeq)[1];
            if (currTopAutoPrice < autoPrice)
                allLiveTopAutoBidder.put(liveSeq, new Object[]{userEmail, autoPrice});

            // 적절한 가격으로 입찰도 자동으로 진행하자
            Live live = liveService.getLiveInfo(liveSeq);
            int currPrice = live.getCurrentPrice();
            int bidUnit = live.getBidUnit();
            int newPrice = Math.min(currPrice + bidUnit, autoPrice);
            return bidNewPrice(authentication, liveSeq, newPrice);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PostMapping("/bid")
    public ResponseEntity<?> bidNewPrice(Authentication authentication, @RequestBody int liveSeq,
            @RequestBody int newPrice) {
        String userEmail = (String) authentication.getCredentials();

        String newTopBidder;
        int newTopPrice;
        int currTopAutoPrice = (int) allLiveTopAutoBidder.get(liveSeq)[1];
        if (currTopAutoPrice <= newPrice) {
            newTopBidder = userEmail;
            newTopPrice = newPrice;
        } else {
            int bidUnit = liveService.getLiveInfo(liveSeq).getBidUnit();
            newTopBidder = (String) allLiveTopAutoBidder.get(liveSeq)[0];
            newTopPrice = newPrice + bidUnit;
        }

        liveService.updateTopBidderInfo(newTopBidder, liveSeq, newTopPrice);
        Map<String, Object> res = new HashMap<>();
        res.put("userEmail", newTopBidder);
        res.put("currentPrice", newTopPrice);
        return new ResponseEntity<>(userEmail, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PostMapping("/exit")
    public ResponseEntity<?> exitLive(Authentication authentication,  @RequestBody Map<String, Integer> map) {
        String userEmail = (String) authentication.getCredentials();
        int liveSeq = map.get("liveSeq");

        liveViewerService.deleteLiveViewer(userEmail);
        liveService.decreaseViewer(liveSeq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/{liveSeq}")
    public ResponseEntity<?> getLiveInfo(@PathVariable("liveSeq") int liveSeq) {
        Live live = liveService.getLiveInfo(liveSeq);
        return new ResponseEntity<>(live, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{liveSeq}")
    public ResponseEntity<?> closeLive(Authentication authentication,
            @PathVariable("liveSeq") int liveSeq) {
        String userEmail = (String) authentication.getCredentials();
        if (!userEmail.equals(auctionService.getAuction(liveSeq).getUserEmail()))
            return new ResponseEntity<>("삭제할 권한이 없습니다.", HttpStatus.BAD_REQUEST);
        liveService.deleteLive(liveSeq);
        allLiveTopAutoBidder.remove(liveSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
