package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Auction;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    Optional<Auction> findByAuctionSeq(int auctionSeq);

}
