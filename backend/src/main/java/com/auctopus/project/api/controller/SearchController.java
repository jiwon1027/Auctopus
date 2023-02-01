package com.auctopus.project.api.controller;

import com.auctopus.project.api.response.AuctionListOneResponse;
import com.auctopus.project.api.response.AuctionListResponse;
import com.auctopus.project.api.response.LiveListOneResponse;
import com.auctopus.project.api.response.LiveListResponse;
import com.auctopus.project.api.service.AuctionImageService;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.LikeCategoryService;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.repository.AuctionRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
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
    private LikeCategoryService likeCategoryService;
    @Autowired
    private AuctionRepository auctionRepository;

//    @GetMapping("/live")
//    public ResponseEntity<LiveListResponse> getLiveAuctionListBySort(@RequestParam(value="word", required = false) String word,@RequestParam(value="page") int page, @RequestParam(value="size") int size, @RequestParam(value="sort") String sort) {
//        List<LiveListOneResponse> liveListOneResponseList = new ArrayList<>();
//        List<Auction> liveList = null;
//        List<Auction> hasMoreList = null;
//        Boolean hasMore = false;
//        if ("main".equals(sort)) {
//            Pageable pageable = PageRequest.of(page, size, Sort.by("viewer").descending());
//            liveList = auctionService.getLiveListByViewer(word, pageable);
//            hasMoreList = auctionService.getLiveListByViewer(word, PageRequest.of(page+1, size, Sort.by("viewer").descending()));
//        } else if ("category".equals("sort")){
//
//        } else {
//
//        }
//
//        return ResponseEntity.status(200).body(LiveListResponse.of(hasMore, 0,liveListOneResponseList));
//    }


//    @GetMapping()
//    public ResponseEntity<AuctionListResponse> getAuctionListBySort(@RequestParam(value="word", required = false) String word, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort, @RequestParam int state) {
//        // sort - 인기순(main), 카테고리순(category), 최신순(startTime)
//        // sort를 숫자로 할지, 키워드로 할지 생각해봐야할것
//
//        // 관심 카테고리는 유저/비유저(or 관심 카테고리 없을때) 나눠서& userSeq 정보 필요
//
//        System.out.println("");
//
//        List<AuctionListOneResponse> auctionListOneResponseList = new ArrayList<>();
//        Integer likeCategorySeq = 0;
//        List<Auction> auctionList = null;
//        List<Auction> hasMoreList = null;
//        Boolean hasMore = false;
//        if ("main".equals(sort)) {
//            // 인기순 (likeCount 순)
//            Pageable pageable = PageRequest.of(page, size, Sort.by("likeCount").descending());
//            auctionList = auctionService.getAuctionListByStartTime(word, pageable);
//            hasMoreList = auctionService.getAuctionListByStartTime(word, PageRequest.of(page+1, size, Sort.by("likeCount").descending()));
//        } else if ("category".equals(sort)) {
//            // 내가 좋아하는 카테고리 경매방 순, likecategoryList[0]
//            String email = null;
//            Pageable pageable = PageRequest.of(page, size);
//            if (email != null) {
//                List<Integer> likeCategoryList = likeCategoryService.getLikeCategoryByEmail(email);
//                if (likeCategoryList.size() != 0) {
//                    likeCategorySeq = likeCategoryList.get(0);
//                    auctionList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, pageable);
//                    hasMoreList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, PageRequest.of(page+1, size));
//                }
//            }
//            if (auctionList == null) {
//                likeCategorySeq = 1 + (int) (Math.random() * 8);
//                auctionList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, pageable);
//                hasMoreList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, PageRequest.of(page+1, size));
//            }
//        } else {
//            // 최신 경매순 (startTime 기준)
//            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
//            auctionList = auctionService.getAuctionListByStartTime(word, pageable);
//            hasMoreList = auctionService.getAuctionListByStartTime(word, PageRequest.of(page+1, size, Sort.by(sort).descending()));
//        }
//        if (hasMoreList.size() != 0)
//            hasMore = true;
//
//        for (Auction auction : auctionList) {
//            //List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());
//            List<AuctionImage> auctionImageList = null;
//            auctionListOneResponseList.add(AuctionListOneResponse.of(auction, auctionImageList));
//        }
//        System.out.println(likeCategorySeq);
//
//        return ResponseEntity.status(200).body(AuctionListResponse.of(hasMore, likeCategorySeq, auctionListOneResponseList));
//    }

    // 경매 시작 전 필터 및 검색용
    // word가 없다면 그냥 정렬 가능 && main은 처음 보여지는 화면으로 'word 있을 때 정렬 기준'
    // 카테고리 순이면 userSeq 가 필요하다

    @GetMapping()
    public ResponseEntity<AuctionListResponse> getAuctionList(Authentication authentication, @RequestParam String word, @RequestParam String sort, @RequestParam int state){
        // 로그인 사용자의 email을 받아옴(from. token)
        String email = (String) authentication.getCredentials();

        int likeCategorySeq = 0;
        List<Auction> auctionList = null;

        if ("main".equals(sort)) { // 시청자 수(Live - viewer)로 sort

            auctionList = auctionService.getAuctionListByViewer(word, state);

        } else if("like".equals(sort)){ // 좋아요(Auction - likeCount)로 sort
            auctionList = auctionService.getAuctionListByLikecount(word, state);


        } else if ("category".equals(sort)) { // category(LikeCategory - categorySeq) or Random
            if (email != null) { // 로그인이 되었으면 유저의 관심 카테고리만 불러오기
                List<Integer> likeCategoryList = likeCategoryService.getLikeCategoryByEmail(email);

                if (likeCategoryList.size() != 0) {
                    auctionList = auctionService.getAuctionListByCategorySeq(likeCategoryList.get(0), state);
                }
            }
            else{ // 로그인이 안되어있으면 랜덤 카테고리 설정해서 불러오기
                likeCategorySeq = 1 + (int) (Math.random() * 8);
                auctionList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, state);
            }

        } else { // 시간으로 sort
            auctionList = auctionService.getAuctionListByTime(state);
        }

        List<AuctionListOneResponse> auctionListOneResponseList = new ArrayList<>();

        for (Auction auction : auctionList) {
//            List<AuctionImage> auctionImageList = null;
//            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());


            auctionListOneResponseList.add(AuctionListOneResponse.of(auction, auctionImageList));
        }

        return ResponseEntity.status(200).body(AuctionListResponse.of(hasMore, likeCategorySeq, auctionListOneResponseList));
    }



    /// 이건 카테고리용 (이건 경매중, 경매 예정, 경매 종료 구분 없음)
    // 나중에 경매 종료한 것은 제외하기 위해 status(경매방 상태표시) 추가해야할 것 같다
    @GetMapping("/category")
    public ResponseEntity<AuctionListResponse> getAuctionListByCategorySeq(@RequestParam("category") int categorySeq, @RequestParam("state") int state {
        List<AuctionListOneResponse> auctionListOneResponseList = new ArrayList<>();
        List<Auction> auctionList = null;
        Boolean hasMore = false;
        auctionList = auctionService.getAuctionListByCategorySeq(categorySeq, state);

        for (Auction auction : auctionList) {
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getAuctionSeq());
            auctionListOneResponseList.add(AuctionListOneResponse.of(auction,auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListResponse.of(hasMore, categorySeq,auctionListOneResponseList));
    }



}
