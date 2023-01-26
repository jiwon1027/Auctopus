package com.auctopus.project.api.response;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionListOneResponse {
    Long auctionSeq;
    int userSeq;
    String title;
    String startTime;
    int likeCount;
    AuctionImage auctionImage;

    public static AuctionListOneResponse of(Auction auction, List<AuctionImage> auctionImageList) {
        AuctionListOneResponse res = AuctionListOneResponse.builder()
                .auctionSeq(auction.getId())
                .userSeq(auction.getUserSeq())
                .title(auction.getTitle())
                .startTime(auction.getStartTime())
                .likeCount(auction.getLikeCount())
                .auctionImage(auctionImageList.get(0))
                .build();
        return res;
    }
}
