package com.acutopus.project.service;

import com.acutopus.project.db.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.acutopus.project.db.domain.Auction;
@Service
public class AuctionServiceImpl implements AuctionService{

    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    public Auction findAuctionById(Long id) {
        return auctionRepository.findById(id).orElse(null);
    }

}
