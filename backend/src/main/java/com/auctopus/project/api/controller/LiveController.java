package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.LiveEnterRequest;
import com.auctopus.project.api.service.LiveService;
import com.auctopus.project.api.service.LiveViewerService;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.live.LiveNotFoundException;
import com.auctopus.project.db.domain.Live;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("live")
@CrossOrigin("*")
public class LiveController {

    @Autowired
    private LiveService liveService;
    private LiveViewerService liveViewerService;

    @PostMapping("/open")
    public ResponseEntity<?> openLive(int liveSeq) {
        liveService.createLive(liveSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/enter")
    public ResponseEntity<?> enterLive(@RequestBody LiveEnterRequest req) {
        liveViewerService.createLiveViewer(req);
        liveService.increaseViewer(req.getLiveSeq());
        if (req.getAutoPrice() != 0)
            liveService.increaseParticipant(req.getLiveSeq());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/exit")
    public ResponseEntity<?> exitLive(@RequestBody int liveSeq, @RequestBody String userEmail) {
        liveViewerService.deleteLiveViewer(userEmail);
        liveService.decreaseViewer(liveSeq);
        if (liveViewerService.getLiveViewer(userEmail).getState() == 1)
            liveService.decreaseParticipant(liveSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> getLiveInfo(@PathVariable("auctionSeq") int liveSeq) {
        Live live = liveService.getLiveInfo(liveSeq);
        if (live == null)
            throw new LiveNotFoundException("라이브를 찾을 수 없습니다.", ErrorCode.LIVE_NOT_FOUND);
        Map<String, Object> res = new HashMap<>();
        res.put("startTime", live.getStartTime());
        res.put("endTime", live.getEndTime());
        res.put("price", live.getPrice());
        res.put("viewer", live.getViewer());
        res.put("participant", live.getParticipant());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
