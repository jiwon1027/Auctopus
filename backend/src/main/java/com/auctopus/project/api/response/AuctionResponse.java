package com.auctopus.project.api.response;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.User;
import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionResponse {

    int auctionSeq;
    String userEmail;
    String nickname;
    String title;
    String content;
    int category;
    int bidUnit;
    Timestamp startTime;
    int startPrice;
    int state;
    List<AuctionImage> auctionImageList;

    public static AuctionResponse of(Auction auction, User user, List<AuctionImage> auctionImageList) {
        AuctionResponse res = AuctionResponse.builder()
                .auctionSeq(auction.getAuctionSeq())
                .userEmail(auction.getUserEmail())
                .nickname(user.getNickname())
                .title(auction.getTitle())
                .content(auction.getContent())
                .category(auction.getCategorySeq())
                .bidUnit(auction.getBidUnit())
                .startTime(auction.getStartTime())
                .startPrice(auction.getStartPrice())
                .auctionImageList(auctionImageList)
                .state(auction.getState())
                .build();
        return res;
    }
}
