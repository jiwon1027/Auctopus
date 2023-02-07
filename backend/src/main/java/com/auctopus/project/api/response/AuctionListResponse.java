package com.auctopus.project.api.response;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.Live;
import java.sql.Timestamp;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionListResponse {
    int auctionSeq;
    String userEmail;
    String title;
    Timestamp startTime;
    int likeCount;
    int startPrice;
    int bidUnit;
    int viewer;
    int price;
    int state;

    AuctionImage auctionImage;

    public static AuctionListResponse of(Auction auction, int liveViewer, int livePrice, List<AuctionImage> auctionImageList) {
        AuctionListResponse res = AuctionListResponse.builder()
                .auctionSeq(auction.getAuctionSeq())
                .userEmail(auction.getUserEmail())
                .title(auction.getTitle())
                .startTime(auction.getStartTime())
                .likeCount(auction.getLikeCount())
                .startPrice(auction.getStartPrice())
                .bidUnit(auction.getBidUnit())
                .viewer(liveViewer)
                .price(livePrice)
                .state(auction.getState())
                .auctionImage(auctionImageList.get(0))
                .build();
        return res;
    }
}
