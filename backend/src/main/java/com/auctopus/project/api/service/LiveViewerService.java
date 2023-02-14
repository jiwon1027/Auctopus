package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.LiveViewer;

/**
 * 라이브 시청자 관련 로직 처리를 위한 서비스 구현
 */
public interface LiveViewerService {

    // 경매 시청자 입장(생성)
    void createLiveViewer(String userEmail, int liveSeq, int autoPrice);

    // 경매 시청자 퇴장(삭제)
    void deleteLiveViewer(String userEmail);


}
