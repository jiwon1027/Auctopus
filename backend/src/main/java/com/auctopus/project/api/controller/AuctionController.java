package com.auctopus.project.api.controller;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.api.response.AuctionListResponse;
import com.auctopus.project.api.response.AuctionResponse;
import com.auctopus.project.api.service.AuctionImageService;
import com.auctopus.project.api.service.AuctionService;
import com.auctopus.project.api.service.LikeAuctionService;
import com.auctopus.project.api.service.LikeCategoryService;
import com.auctopus.project.api.service.LiveService;
import com.auctopus.project.api.service.UserService;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.domain.Live;
import com.auctopus.project.db.domain.User;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auction")

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
    private LikeAuctionService likeAuctionService;
    @Autowired
    private LikeCategoryService likeCategoryService;

    @CrossOrigin("*")
    @PostMapping()
    public ResponseEntity<?> registerAuction(Authentication authentication,
            @RequestPart AuctionCreateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> auctionImageList) {
        String userEmail = (String) authentication.getCredentials();
        Auction auction = auctionService.createAuction(userEmail, req, auctionImageList);
        if (auction == null)
            return new ResponseEntity<>("????????? ???????????? ???????????????", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(auction, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PutMapping()
    public ResponseEntity<?> updateAuction(Authentication authentication,
            @RequestPart AuctionUpdateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> auctionImageList) {
        String userEmail = (String) authentication.getCredentials();
        Auction auction = auctionService.getAuction(req.getAuctionSeq());
        if (!userEmail.equals((auction.getUserEmail())))
            return new ResponseEntity<>("????????? ????????? ????????????.", HttpStatus.BAD_REQUEST);
        auctionImageService.updateAuctionImageList(req.getAuctionSeq(), auctionImageList);
        auctionService.updateAuction(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{auctionSeq}")
    public ResponseEntity<?> deleteAuction(Authentication authentication,
            @PathVariable("auctionSeq") int auctionSeq) {
        String userEmail = (String) authentication.getCredentials();
        Auction auction = auctionService.getAuction(auctionSeq);
        if (!userEmail.equals((auction.getUserEmail())))
            return new ResponseEntity<>("????????? ????????? ????????????.", HttpStatus.BAD_REQUEST);
        auctionService.deleteAuction(auctionSeq);
        auctionImageService.deleteAuctionImageList(auctionSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // ?????? ????????????
    @CrossOrigin("*")
    @GetMapping("/{auctionSeq}")
    public ResponseEntity<?> getAuctionInfo(Authentication authentication,
            @PathVariable("auctionSeq") int auctionSeq) {
        String userEmail = (String) authentication.getCredentials(); // ???????????? ??????
        Auction auction = auctionService.getAuction(auctionSeq);
        User user = userService.getUser(auction.getUserEmail()); // ???????????? ??????
        boolean isLiked = likeAuctionService.checkingExistence(userEmail, auctionSeq);
        List<AuctionImage
                > auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(
                auctionSeq);
        return ResponseEntity.status(200)
                .body(AuctionResponse.of(auction, user, isLiked, auctionImageList));
    }

    // ?????? ?????? ?????? ?????????(state=0)
    // state??? 1??? ????????? ?????? ??????????????? ????????? ?????? ???????????? ????????? default state=0 ?????? ???
    @CrossOrigin("*")
    @GetMapping("/mylist")
    public ResponseEntity<List<AuctionListResponse>> getMyAuctionList(
            Authentication authentication) {

        String email = (String) authentication.getCredentials();
        List<Auction> auctionList = null;
        auctionList = auctionService.getMyAuctionListByEmail(email);
        List<AuctionListResponse> auctionListResponseList = new ArrayList<>();
        for (Auction auction : auctionList) {
            //List<AuctionImage> auctionImageList = null;
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(
                    auction.getAuctionSeq());
            auctionListResponseList.add(
                    AuctionListResponse.of(auction, 0, auction.getStartPrice(), auctionImageList));
        }
        return new ResponseEntity<>(auctionListResponseList, HttpStatus.OK);
    }

    /// ?????? ??? - auctionlist ????????????
    /// main - ????????? viewer / like - ???????????? likeCount / category - ?????? ?????????????????? ??? / startTime - ?????????
    @CrossOrigin("*")
    @GetMapping("/list")
    public ResponseEntity<List<AuctionListResponse>> getAuctionList(
            @Nullable Authentication authentication, @RequestParam("sort") String sort,
            @RequestParam("state") int state) {
        String email = null;
        if (authentication != null)
            email = (String) authentication.getCredentials();

        List<Auction> auctionList = new ArrayList<>();
        int likeCategorySeq = 0;

        if ("main".equals(sort)) {
            auctionList = auctionService.getAuctionListByViewer(state);
        } else if ("like".equals(sort)) {
            auctionList = auctionService.getAuctionListByLikeCount(state);
        } else if ("category".equals(sort)) {
            if (email != null) {
                List<Integer> likeCategoryList = likeCategoryService.getLikeCategoryByEmail(email);
                if (likeCategoryList.size() != 0) {
                    auctionList = auctionService.getAuctionListByCategorySeq(
                            likeCategoryList.get(0), state);
                }
            } else {
                likeCategorySeq = 1 + (int) (Math.random() * 8);
                auctionList = auctionService.getAuctionListByCategorySeq(likeCategorySeq, state);
            }
        } else {
            auctionList = auctionService.getAuctionListByTime(state);
        }
        List<AuctionListResponse> auctionListResponseList = new ArrayList<>();
        System.out.println(auctionList);
        for (Auction auction : auctionList) {
            Live live = null;
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(
                    auction.getAuctionSeq());
            if (state == 2) {
                live = liveService.getLiveInfo(auction.getAuctionSeq());
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
