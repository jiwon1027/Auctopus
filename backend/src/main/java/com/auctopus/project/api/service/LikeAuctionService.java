package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Auction;
import java.util.List;

/**
 * 관심 경매 관련 로직 처리를 위한 서비스 구현
 */
public interface LikeAuctionService {

    // 새로운 관심 경매 등록
    boolean creatLikeAuction(String userEmail, int auctionSeq);

    // 등록해놓은 관심 경매 관심 해제
    boolean deleteLikeAuction(String userEmail, int auctionSeq);

    // 경매를 관심 눌러놓았었는지 확인
    boolean checkingExistence(String userEmail, int auctionSeq);

    // 사용자의 관심 경매 목록 가져오기
    List<Auction> getLikeAuctionList(String userEmail);

}
