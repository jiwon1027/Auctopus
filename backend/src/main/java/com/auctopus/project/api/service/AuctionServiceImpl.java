package com.auctopus.project.api.service;

import com.auctopus.project.api.request.AuctionCreateRequest;
import com.auctopus.project.api.request.AuctionUpdateRequest;
import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.repository.AuctionImageRepository;
import com.auctopus.project.db.repository.AuctionRepository;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.auctopus.project.db.domain.Auction;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private AuctionImageRepository auctionImageRepository;
    @Autowired
    S3FileService s3FileService;

    @Override
    public Auction getAuction(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        return auction;
    }

    @Override
    @Transactional
    public Auction createAuction(String userEmail, AuctionCreateRequest req, List<MultipartFile> multipartFileList) {
        Auction auction = Auction.builder()
                .userEmail(userEmail)
                .categorySeq(req.getCategorySeq())
                .title(req.getTitle())
                .content(req.getContent())
                .startTime(req.getStartTime())
                .startPrice(req.getStartPrice())
                .bidUnit(req.getBidUnit())
                .link("https://i8a704.p.ssafy.io/")
                .build();
        auctionRepository.save(auction);

        if (multipartFileList == null) {
            auctionImageRepository.save(AuctionImage.builder()
                    .auctionSeq(auction.getAuctionSeq())
                    .imageUrl("https://s3-auctopus.s3.ap-northeast-2.amazonaws.com/auctopus-basic.jpg")
                    .build());
        } else {
            try {
                List<String> imageUrlList = s3FileService.uploadAuctionImage(multipartFileList, auction.getAuctionSeq());
                for (String imageUrl : imageUrlList) {
                    AuctionImage auctionImage = AuctionImage.builder()
                            .auctionSeq(auction.getAuctionSeq())
                            .imageUrl(imageUrl)
                            .build();
                    auctionImageRepository.save(auctionImage);
                }
            } catch (Exception e){
                throw new RuntimeException(e);
            }
        }
        return auction;
    }

    @Override
    @Transactional
    public Auction updateAuction(String userEmail, int auctionSeq, AuctionUpdateRequest req) {
        Auction auction = auctionRepository.findByUserEmailAndAuctionSeq(userEmail, auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auction.setCategorySeq(req.getCategorySeq());
        auction.setTitle(req.getTitle());
        auction.setContent(req.getContent());
        auction.setStartTime(req.getStartTime());
        auction.setStartPrice(req.getStartPrice());
        auction.setBidUnit(req.getBidUnit());
        auctionRepository.save(auction);
        return auction;
    }

    @Override
    @Transactional
    public void deleteAuction(int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        auctionRepository.delete(auction);
    }

    @Override
    public List<Auction> getMyAuctionListByEmail(String email) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByEmail(email);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByViewer(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByViewer(state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByLikeCount(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByLikeCount(state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByCategorySeq(int likeCategorySeq, int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAuctionByCategorySeq(likeCategorySeq, state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByTime(int state) {
        List<Auction> auctionList = null;
        auctionList = auctionRepository.findAllAuctionByStartTime(state);
        return auctionList;
    }

    // 검색 경매
    @Override
    public List<Auction> getAuctionListByViewerAndWordOrCategorySeq(String word, int categorySeq, int state) {
        List<Auction> auctionList = null;
        if (categorySeq == 0) auctionList = auctionRepository.findAllAuctionByViewerAndWord(word, state);
        else auctionList =  auctionRepository.findAllAuctionByViewerAndCategory(categorySeq, state);
        return auctionList;
    }

    @Override
    public List<Auction> getAuctionListByLikeCountAndWordOrCategorySeq(String word,int categorySeq, int state) {
        List<Auction> auctionList = null;
        if (categorySeq == 0) auctionList = auctionRepository.findAllAuctionByLikeCountAndWord(word, state);
        else auctionList = auctionRepository.findAllAuctionByLikeCountAndCategory(categorySeq, state);
        return auctionList;
    }


    // 카테고리 경매
//    @Override
//    public List<Auction> getAuctionListByViewerAndCategory(int categorySeq, int state) {
//        List<Auction> auctionList = null;
//        auctionList = auctionRepository.findAllAuctionByViewerAndCategory(categorySeq, state);
//        return auctionList;
//    }
//
//    @Override
//    public List<Auction> getAuctionListByLikeCountAndCategory(int categorySeq, int state) {
//        List<Auction> auctionList = null;
//        auctionList = auctionRepository.findAllAuctionByLikeCountAndCategory(categorySeq, state);
//        return auctionList;
//    }
}
