package com.auctopus.project.api.response;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.User;
import java.sql.Timestamp;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionResponse {

    int auctionSeq;
    String email;
    String nickname;
    String title;
    String content;
    int categorySeq;
    Timestamp startTime;
    int startPrice;
    List<AuctionImage> auctionImageList;

    public static AuctionResponse of(Auction auction, User user, List<AuctionImage> auctionImageList) {
        AuctionResponse res = AuctionResponse.builder()
                .auctionSeq(auction.getAuctionSeq())
                .email(auction.getUserEmail())
                .nickname(user.getNickname())
                .title(auction.getTitle())
                .content(auction.getContent())
                .categorySeq(auction.getCategorySeq())
                .startTime(auction.getStartTime())
                .startPrice(auction.getStartPrice())
                .auctionImageList(auctionImageList)
                .build();
        return res;
    }
}
