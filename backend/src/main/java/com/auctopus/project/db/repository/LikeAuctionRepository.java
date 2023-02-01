package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.LikeAuction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface LikeAuctionRepository extends JpaRepository<LikeAuction, Integer> {

    @Query(value = "SELECT * FROM like_auction l WHERE l.user_email = :userEmail", nativeQuery = true)
    List<LikeAuction> findByUserEmail(String userEmail);

    @Query(value= "SELECT * FROM like_auction l WHERE l.user_email = :userEmail AND l.auction_seq = :auctionSeq", nativeQuery = true)
    LikeAuction findByUserEmailAndAuctionSeq(String userEmail, int auctionSeq);

}
