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

    @Query("SELECT a FROM LikeAuction a WHERE a.userEmail = ?1")
    List<LikeAuction> findLikeAuctionListByUserEmail(String userEmail);

    @Query("SELECT a FROM LikeAuction a WHERE a.userEmail=?1AND a.auctionSeq =?2")
    LikeAuction findByUserEmailAndAuctionSeq(String userEmail, int auctionSeq);

}
