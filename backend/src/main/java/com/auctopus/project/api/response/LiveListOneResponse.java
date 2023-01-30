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
public class LiveListOneResponse {

    int liveSeq;
    int auctionSeq;
    String userEmail;
    String title;
    Timestamp startTime;
    Timestamp endTime;
    int viewer;
    int price;
    int onAir;
    AuctionImage auctionImage;
    public static LiveListOneResponse of(Live live, Auction auction, List<AuctionImage> auctionImageList) {
        LiveListOneResponse res = LiveListOneResponse.builder()
                .liveSeq(live.getLiveSeq())
                .auctionSeq(auction.getAuctionSeq())
                .userEmail(auction.getUserEmail())
                .title(auction.getTitle())
                .startTime(live.getStartTime())
                .viewer(live.getViewer())
                .price(live.getViewer())
                .onAir(live.getOnAir())
                .auctionImage(auctionImageList.get(0))
                .build();
        return res;

    }
}
