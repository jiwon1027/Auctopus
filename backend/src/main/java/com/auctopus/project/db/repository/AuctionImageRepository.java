package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@EnableJpaRepositories
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Integer> {

    AuctionImage findByAuctionImageSeq(int auctionImageSeq);

    Optional<List<AuctionImage>> findByAuctionSeq(int AuctionSeq);

    @Transactional
    @Modifying(clearAutomatically = true)
    void deleteAllByAuctionSeq(int auctionSeq);
}