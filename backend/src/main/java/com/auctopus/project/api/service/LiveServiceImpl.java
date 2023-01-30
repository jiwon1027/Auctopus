package com.auctopus.project.api.service;

import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.common.exception.live.LiveNotFoundException;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.repository.LiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveServiceImpl implements LiveService {

    @Autowired
    private LiveRepository liveRepository;

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

//    @Override
//    @Transactional
//    public void increaseParticipant(int liveSeq){
//
//    }
//
//    @Override
//    @Transactional
//    public void decreaseParticipant(int liveSeq){
//
//    }

}
