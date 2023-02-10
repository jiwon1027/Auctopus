package com.auctopus.project.api.controller;

import com.auctopus.project.api.response.AuctionListResponse;
import com.auctopus.project.api.service.AuctionImageService;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.LiveService;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.Live;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@CrossOrigin("*")
public class SearchController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private AuctionImageService auctionImageService;

    @Autowired
    private LiveService liveService;

    // authentication는 최신 검색기록 때문에 필요해서 param에 넣음(보류)
    // 검색창에 경매 검색 했을 때
    @CrossOrigin("*")
    @GetMapping()
    public ResponseEntity<List<AuctionListResponse>> getAuctionListByWordOrCategory(
            @Nullable Authentication authentication, @RequestParam(required = false) String word, @RequestParam(required=false)int category,
            @RequestParam int state) throws UnsupportedEncodingException {
        List<Auction> auctionList = null;
        int categorySeq = 0;
        if (category > 0) categorySeq = category;
        if (state == 1) { // 시청자 수(Live - viewer)로 sort
            auctionList = auctionService.getAuctionListByViewerAndWordOrCategorySeq(word, categorySeq, state);
        } else { // 좋아요(Auction - likeCount)로 sort
            auctionList = auctionService.getAuctionListByLikeCountAndWordOrCategorySeq(word, categorySeq, state);
        }
        List<AuctionListResponse> auctionListResponseList = new ArrayList<>();
        for (Auction auction : auctionList) {
//            List<AuctionImage> auctionImageList = null;
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());
            if (state == 1) {
                System.out.println(auction.getAuctionSeq());
                Live live = liveService.getLiveInfo(auction.getAuctionSeq());
                auctionListResponseList.add(
                        AuctionListResponse.of(auction, live.getViewer(), live.getCurrentPrice(),
                                auctionImageList));
            } else {
                auctionListResponseList.add(
                        AuctionListResponse.of(auction, 0, auction.getStartPrice(),
                                auctionImageList));
            }
        }
        return new ResponseEntity<>(auctionListResponseList, HttpStatus.OK);
    }
}
