package com.acutopus.project.service;

import com.acutopus.project.db.domain.Auction;
public interface AuctionService {
    Auction findAuctionById(Long id);
}
