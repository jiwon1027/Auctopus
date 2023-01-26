package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.db.domain.Auction;

/**
 * 경매방 관련 로직 처리를 위한 서비스 구현
 */

public interface AuctionService {

    // 한 개의 경매방 정보 보기
    Auction getAuction(int auctionSeq);

    // 경매방 정보 수정
    void updateAuction(int auctionSeq, AuctionUpdateRequest req);
    // 경매방 정보 삭제

    void deleteAuction(int auctionSeq);
}
