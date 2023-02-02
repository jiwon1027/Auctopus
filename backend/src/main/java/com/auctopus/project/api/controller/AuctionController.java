package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.api.response.AuctionListResponse;
import com.auctopus.project.api.service.AuctionImageService;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.CategoryService;
import com.auctopus.project.api.service.LikeCategoryService;
import com.auctopus.project.api.service.LiveService;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.domain.User;
import com.auctopus.project.db.domain.Auction;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auction")
@CrossOrigin("*")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;
    @Autowired
    private UserService userService;
    @Autowired
    private LiveService liveService;
    @Autowired
    private AuctionImageService auctionImageService;
    @Autowired
    private LikeCategoryService likeCategoryService;

    @PostMapping()
    public ResponseEntity<?> registerAuction(@RequestBody AuctionCreateRequest req) {
        auctionService.createAuction(req);
        return new ResponseEntity<>(req, HttpStatus.OK);
    }


    @PatchMapping()
    public ResponseEntity<?> updateAuction(@RequestBody AuctionUpdateRequest req) {
        Auction auction = auctionService.getAuction(req.getAuctionSeq());
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        else {
            auctionService.updateAuction(req);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/{auctionSeq}")
    public ResponseEntity<?> deleteAuction(@PathVariable("auctionSeq") int auctionSeq) {
        Auction auction = auctionService.getAuction(auctionSeq);
        if (auction == null)
            throw new AuctionNotFoundException("경매방을 찾을 수 없습니다.", ErrorCode.AUCTION_NOT_FOUND);
        else {
            auctionService.deleteAuction(auctionSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    // 경매 상세정보
    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> getAuctionInfo(@PathVariable("auctionSeq") int auctionSeq) {
        Auction auction = auctionService.getAuction(auctionSeq);
        User user = userService.getUser(auction.getUserEmail());

        Map<String, Object> res = new HashMap<>();
        res.put("profileUrl", user.getProfileUrl());
        res.put("nickname", user.getNickname());
        res.put("userEmail", auction.getUserEmail());
        res.put("category", auction.getCategorySeq());
        res.put("title", auction.getTitle());
        res.put("content", auction.getContent());
        res.put("startTime", auction.getStartTime());
        res.put("startPrice", auction.getStartPrice());
        res.put("likeCount", auction.getLikeCount());
        res.put("state", auction.getState());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 나의 경매 예정 리스트(state=0)
    // state가 1인 애들을 아직 서비스에서 어떻게 할지 못정했기 때문에 default state=0 으로 함
    @GetMapping("/mylist")
    public ResponseEntity<List<AuctionListResponse>> getMyAuctionList(Authentication authentication) {

        String email = (String) authentication.getCredentials();
        List<Auction> auctionList = null;
        auctionList = auctionService.getMyAuctionListByEmail(email);
        List<AuctionListResponse> auctionListResponseList = new ArrayList<>();
        for (Auction auction : auctionList) {
            //List<AuctionImage> auctionImageList = null;
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());
            auctionListResponseList.add(AuctionListResponse.of(auction, 0,auction.getStartPrice(), auctionImageList));
        }
        return new ResponseEntity<>(auctionListResponseList, HttpStatus.OK);
    }

    /// 메인 방 - auctionlist 불러오기
    /// main - 경매중 viewer / like - 경매예정 likeCount / category - 유저 관심카테고리 순 / startTime - 최신순
    @GetMapping("/list")
    public ResponseEntity<List<AuctionListResponse>> getAuctionList(@Nullable Authentication authentication, @RequestParam("sort") String sort, @RequestParam("state") int state) {
        String email = null;
        if(authentication != null)
            email = (String) authentication.getCredentials();

        System.out.println("=====================email : " + email);
        List<Auction> auctionList = new ArrayList<>();
        int likeCategorySeq = 0;

        if ("main".equals(sort)) {
            auctionList = auctionService.getAuctionListByViewer(state);
        } else if ("like".equals(sort)){
            auctionList = auctionService.getAuctionListByLikeCount(state);
        } else if ("category".equals(sort)) {
            if (email != null) {
                List<Integer> likeCategoryList = likeCategoryService.getLikeCategoryByEmail(email);
                if (likeCategoryList.size() != 0) {
                    auctionList = auctionService.getAuctionListByCategorySeq(likeCategoryList.get(0), state);
                }
            }
            else {
                likeCategorySeq = 1 + (int) (Math.random() * 8);
                auctionList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, state);
            }
        } else {
            auctionList = auctionService.getAuctionListByTime(state);
        }
        List<AuctionListResponse> auctionListResponseList = new ArrayList<>();
        System.out.println(auctionList);
        for (Auction auction : auctionList) {
            //List<AuctionImage> auctionImageList = null;
            Live live = null;
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());
            if (state == 1) {
                live = liveService.getLiveInfo(auction.getAuctionSeq());
                auctionListResponseList.add(AuctionListResponse.of(auction, live.getViewer(), live.getPrice(),auctionImageList));
            } else {
                auctionListResponseList.add(AuctionListResponse.of(auction, 0, auction.getStartPrice(),auctionImageList));
            }
        }
        return new ResponseEntity<>(auctionListResponseList, HttpStatus.OK);
    }
}
