package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Auction;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

public interface AuctionService {

    Auction findAuctionById(Long id);
    List<Auction> getAuctionListToday(Pageable pageable);
    List<Auction> getAuctionListByStartTime(String word, Pageable pageable);
    List<Auction> getAuctionListByCategorySeq(Long likeCategorySeq, Pageable pageable);
    List<Auction> getAuctionListTodayAndCategorySeq(Long categorySeq, Pageable pageable);
    List<Auction> getAllAuctionListByCategorySeq(Long categorySeq, Pageable pageable);
}
