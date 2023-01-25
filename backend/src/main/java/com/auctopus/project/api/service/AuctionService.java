package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Auction;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface AuctionService {

    Auction findAuctionById(Long id);
    List<Auction> getAuctionListToday(Pageable pageable);
    List<Auction> getAuctionListByStartTime(String word, Pageable pageable);

}
