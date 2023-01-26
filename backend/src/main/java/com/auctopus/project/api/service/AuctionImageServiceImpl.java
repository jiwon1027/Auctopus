package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.repository.AuctionImageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuctionImageServiceImpl implements AuctionImageService{

    @Autowired
    private AuctionImageRepository auctionImageRepository;

    @Override
    public List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq) {
        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return auctionImageList;
    }

}
