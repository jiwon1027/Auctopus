package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Auction;

public interface AuctionService {

    Auction findAuctionById(Long id);
}
