package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.AuctionImage;
import com.auctopus.project.db.repository.AuctionImageRepository;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AuctionImageServiceImpl implements AuctionImageService {

    @Autowired
    private AuctionImageRepository auctionImageRepository;

    @Autowired
    private S3FileService s3FileService;

    @Override
    public List<AuctionImage> getAuctionImageListByAuctionSeq(int auctionSeq) {
        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionSeq(auctionSeq)
                .orElse(null);
        return auctionImageList;
    }

    @Override
    public void updateAuctionImageList(int auctionSeq, List<MultipartFile> auctionImageList) {
        List<AuctionImage> auctionImageListDelete = auctionImageRepository.findByAuctionSeq(auctionSeq).get();
        for (AuctionImage auctionImage : auctionImageListDelete) {
            s3FileService.deleteFileName(auctionImage.getImageUrl().substring(1));
        }
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);
        if (auctionImageList == null) {
            auctionImageRepository.save(AuctionImage.builder()
                    .auctionSeq(auctionSeq)
                    .imageUrl("https://s3-auctopus.s3.ap-northeast-2.amazonaws.com/auctopus-basic.jpg")
                    .build());
        } else {
            try {
                List<String> imageUrlList = s3FileService.uploadAuctionImage(auctionImageList, auctionSeq);
                for (String imageUrl : imageUrlList) {
                    AuctionImage auctionImage = AuctionImage.builder()
                            .auctionSeq(auctionSeq)
                            .imageUrl(imageUrl)
                            .build();
                    auctionImageRepository.save(auctionImage);
                }
            } catch (Exception e){
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    @Transactional
    public void deleteAuctionImageList(int auctionSeq) {
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);
    }
}
