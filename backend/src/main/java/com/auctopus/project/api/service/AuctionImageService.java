package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;

public interface AuctionImageService {

    List<AuctionImage> getAuctionImageListByAuctionSeq(int auctionSeq);

}
