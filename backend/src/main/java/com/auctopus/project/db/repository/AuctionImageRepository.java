package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.AuctionImage;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Integer> {

    AuctionImage findByAuctionImageSeq(Long auctionImageSeq);

    Optional<List<AuctionImage>> findByAuctionSeq(Long auctionSeq);

    @Transactional
    @Modifying(clearAutomatically = true)
    void deleteAllByAuctionSeq(Long auctionSeq);
}