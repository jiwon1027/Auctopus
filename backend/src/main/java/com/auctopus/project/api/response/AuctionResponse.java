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
    String profileUrl;
    String nickname;
    String title;
    String content;
    int categorySeq;
    int bidUnit;
    Timestamp startTime;
    int startPrice;
    int likeCount;
    int state;
    List<AuctionImage> auctionImageList;

    public static AuctionResponse of(Auction auction, User user, List<AuctionImage> auctionImageList) {
        AuctionResponse res = AuctionResponse.builder()
                .auctionSeq(auction.getAuctionSeq())
                .userEmail(auction.getUserEmail())
                .profileUrl(user.getProfileUrl())
                .nickname(user.getNickname())
                .title(auction.getTitle())
                .content(auction.getContent())
                .categorySeq(auction.getCategorySeq())
                .bidUnit(auction.getBidUnit())
                .startTime(auction.getStartTime())
                .startPrice(auction.getStartPrice())
                .auctionImageList(auctionImageList)
                .likeCount(auction.getLikeCount())
                .state(auction.getState())
                .build();
        return res;
    }
}
