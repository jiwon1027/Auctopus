package com.auctopus.project.api.controller;

import com.auctopus.project.api.response.AuctionListOneResponse;
import com.auctopus.project.api.response.AuctionListResponse;
import com.auctopus.project.api.service.AuctionImageServiceImpl;
import com.auctopus.project.api.service.AuctionServiceImpl;
import com.auctopus.project.api.service.LikeCategoryServiceImpl;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.repository.AuctionRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private AuctionServiceImpl auctionServiceImpl;

    @Autowired
    private AuctionImageServiceImpl auctionImageServiceImpl;

    @Autowired
    private LikeCategoryServiceImpl likeCategoryServiceImpl;
    @Autowired
    private AuctionRepository auctionRepository;

    // 경매 시작 전 필터 및 검색용
    // word가 없다면 그냥 정렬 가능 && main은 처음 보여지는 화면으로 && word가 있으면 검색으로 사용 가능
    // 카테고리 순이면 userSeq 가 필요하다
    @GetMapping("/")
    public ResponseEntity<AuctionListResponse> getAuctionListByWord(@RequestParam(value="word", required = false) String word, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort) {
        // sort - 하루 남은 경매방(main), 경매임박순(startTime), 최신순(recent), 인기순(likecount), 카테고리순(category)
        // sort를 숫자로 할지, 키워드로 할지 생각해봐야할것

        // 관심 카테고리는 유저/비유저(or 관심 카테고리 없을때) 나눠서& userSeq 정보 필요
        List<AuctionListOneResponse> auctionListOneResponseList = new ArrayList<>();
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        Boolean hasMore = false;
        if ("main".equals(sort)) {
            // 개인 추천순! 경메 임박 & 인기순으로
            // 열리기 까지 하루 남은 경매방
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionServiceImpl.getAuctionListToday(pageable);
            hasMoreList = auctionServiceImpl.getAuctionListToday(PageRequest.of(page+1,size));
        } else if ("startTime".equals(sort)) {
            // 경매 임박순 (시작안한 경매방 곧 열릴 순으로 정렬)
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
            auctionList = auctionServiceImpl.getAuctionListByStartTime(word, pageable);
            hasMoreList = auctionServiceImpl.getAuctionListByStartTime(word,PageRequest.of(page+1, size, Sort.by(sort).ascending()));
        } else if ("category".equals(sort)) {
            // 내가 하고 싶은 것 : likecategory에 속한 모든 auction을 모두 포함하고 pageable 하고 싶음
            // 근데 어떻게 하는지 모름....
            String email = null;
            Pageable pageable = PageRequest.of(page, size);
            if (email != null) {
                List<Long> likeCategoryList = likeCategoryServiceImpl.getLikeCategoryByEmail(email);
                if (likeCategoryList.size() != 0) {
                    Long likeCategorySeq = likeCategoryList.get(0);
                    auctionList = auctionServiceImpl.getAuctionListByCategorySeq(likeCategorySeq, pageable);
                    hasMoreList = auctionServiceImpl.getAuctionListByCategorySeq(likeCategorySeq, PageRequest.of(page+1, size));
                }
            }
            if (auctionList == null) {
                Long likeCategorySeq = 1 + (long) (Math.random() * 14);
                auctionList = auctionServiceImpl.getAuctionListByCategorySeq(likeCategorySeq, pageable);
                hasMoreList = auctionServiceImpl.getAuctionListByCategorySeq(likeCategorySeq, PageRequest.of(page+1, size));
            }
        } else {
            //최신 등록순 (시작안한 경매방 나중에 열릴순으로 정렬) && likeCount 순으로 정렬하기
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
            auctionList = auctionServiceImpl.getAuctionListByStartTime(word, pageable);
            hasMoreList = auctionServiceImpl.getAuctionListByStartTime(word, PageRequest.of(page+1, size, Sort.by(sort).descending()));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {
            List<AuctionImage> auctionImageList = auctionImageServiceImpl.getAuctionImageListByAuctionSeq(auction.getId());
            auctionListOneResponseList.add(AuctionListOneResponse.of(auction,auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListResponse.of(hasMore, 0,auctionListOneResponseList));
    }


    /// 이건 카테고리용 (이건 경매중, 경매 예정 구분 없음)
    // 생각해보는건데 경매 종료한 것도 보여줘야하나...???? 그래서 status 가 필요하는가
    @GetMapping("/category")
    public ResponseEntity<AuctionListResponse> getAuctionListByCategorySeq(@RequestParam("categorySeq") Long categorySeq, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort) {
        List<AuctionListOneResponse> auctionListOneResponseList = new ArrayList<>();
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        Boolean hasMore = false;
        if ("main".equals(sort)) {
            // 개인 추천순! 경메 임박 & 인기순으로
            // 열리기 까지 하루 남은 경매방
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionServiceImpl.getAuctionListTodayAndCategorySeq(categorySeq,pageable);
            hasMoreList = auctionServiceImpl.getAuctionListTodayAndCategorySeq(categorySeq,PageRequest.of(page+1,size));
        } else if ("startTime".equals(sort)) {
            // 곧 열릴 순 (시작안한 경매방 곧 열릴 순으로 정렬)
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
            auctionList = auctionServiceImpl.getAllAuctionListByCategorySeq(categorySeq, pageable);
            hasMoreList = auctionServiceImpl.getAllAuctionListByCategorySeq(categorySeq,PageRequest.of(page+1, size, Sort.by(sort).ascending()));
        } else {
            //최신 등록순 (가장 나중에 열릴 방) && likeCount 순으로 정렬하기
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
            auctionList = auctionServiceImpl.getAllAuctionListByCategorySeq(categorySeq, pageable);
            hasMoreList = auctionServiceImpl.getAllAuctionListByCategorySeq(categorySeq, PageRequest.of(page+1, size, Sort.by(sort).descending()));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {
            List<AuctionImage> auctionImageList = auctionImageServiceImpl.getAuctionImageListByAuctionSeq(auction.getId());
            auctionListOneResponseList.add(AuctionListOneResponse.of(auction,auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListResponse.of(hasMore, 0,auctionListOneResponseList));
    }
}
