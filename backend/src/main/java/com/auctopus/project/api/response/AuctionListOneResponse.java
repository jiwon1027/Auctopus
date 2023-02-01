package com.auctopus.project.api.response;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import java.sql.Timestamp;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionListOneResponse {
    int auctionSeq;
    String email;
    String title;
    Timestamp startTime;
    int likeCount;
    int startPrice;
    int state;
//    AuctionImage auctionImage;

    public static AuctionListOneResponse of(Auction auction, List<AuctionImage> auctionImageList) {
        AuctionListOneResponse res = AuctionListOneResponse.builder()
                .auctionSeq(auction.getAuctionSeq())
                .email(auction.getUserEmail())
                .title(auction.getTitle())
                .startTime(auction.getStartTime())
                .likeCount(auction.getLikeCount())
                .startPrice(auction.getStartPrice())
//                .auctionImage(auctionImageList.get(0))
                .build();
        return res;
    }
}
