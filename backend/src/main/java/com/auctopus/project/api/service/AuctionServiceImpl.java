package com.auctopus.project.api.service;

import com.auctopus.project.db.repository.AuctionRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.auctopus.project.db.domain.Auction;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    public Auction findAuctionById(Long id) {
        return auctionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Auction> getAuctionListToday(Pageable pageable) {
        String todayTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String tomorrowTime = LocalDateTime.now().plusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        List<Auction> auctionList = auctionRepository.findImmAuctionByTimeAsc(todayTime, tomorrowTime, pageable);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByStartTime(String word, Pageable pageable) {
        List<Auction> auctionList = null;
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (word == null) {
            word = "";
        }
        auctionList = auctionRepository.findAllByWord(word, currentTime, pageable);
        return auctionList;
    }
}
