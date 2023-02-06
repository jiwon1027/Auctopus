package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface AuctionImageService {

    List<AuctionImage> getAuctionImageListByAuctionSeq(int auctionSeq);
    void updateAuctionImageList(int auctionSeq, List<MultipartFile> auctionImageList);
    void deleteAuctionImageList(int auctionSeq);

}
