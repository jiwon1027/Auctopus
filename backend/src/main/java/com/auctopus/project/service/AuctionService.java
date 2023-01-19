package com.auctopus.project.service;

import com.auctopus.project.db.domain.Auction;

public interface AuctionService {

    Auction findAuctionById(Long id);
}
