package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface AuctionImageService {

    List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq);

}
