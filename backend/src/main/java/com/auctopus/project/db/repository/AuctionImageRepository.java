package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionImageRepository {

    AuctionImage findById(Long imageId);

    Optional<List<AuctionImage>> findByAuctionSeq(Long auction_seq);

    @Transactional
    @Modifying(clearAutomatically = true)
    void deleteAllByAuctionSeq(Long auction_seq);
}