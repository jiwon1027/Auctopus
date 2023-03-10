package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.db.domain.Auction;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 * 경매방 관련 로직 처리를 위한 서비스 구현
 */
public interface AuctionService {

    // 시청자 수로 sort한 경매 리스트 목록
    List<Auction> getAuctionListByViewer(int state);

    // 좋아요 수로 sort한 경매 리스트 목록
    List<Auction> getAuctionListByLikeCount(int state);

    // 카테고리(관심)별 경매리스트
    List<Auction> getAuctionListByCategorySeq(int likeCategorySeq, int state);

    // 시간별 경매리스트
    List<Auction> getAuctionListByTime(int state);

    // word
    List<Auction> getAuctionListByViewerAndWordOrCategorySeq(String word, int categorySeq,
            int state);

    List<Auction> getAuctionListByLikeCountAndWordOrCategorySeq(String word, int categorySeq,
            int state);

    // 내 판매 예정 경매방 리스트
    List<Auction> getMyAuctionListByEmail(String email);

    // 새로운 경매방 생성
    Auction createAuction(String userEmail, AuctionCreateRequest req,
            List<MultipartFile> multipartFileList);

    // 경매방 정보 수정
    Auction updateAuction(AuctionUpdateRequest req);

    // 경매방 정보 삭제
    void deleteAuction(int auctionSeq);

    // 한 개의 경매방 정보 보기
    Auction getAuction(int auctionSeq);

}
