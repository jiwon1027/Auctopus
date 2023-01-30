package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Auction;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    Optional<Auction> findByAuctionSeq(int auctionSeq);

    // 키워드(word)가 포함된 경매 오픈 전 & 경매중인 물품들
    @Query("SELECT a FROM Auction a where (a.title like CONCAT('%', : word, '%') OR a.content like CONCAT('%', :word, '%')) AND (a.startTime > :currentTime) ORDER BY a.startTime")
    List<Auction> findAllByTitleContainsOrContentContains(@Param("word")String word, @Param("currentTime")String currentTime,
            Pageable pageable);

    @Query("SELECT a FROM Auction a JOIN LikeCategory lc ON a.userEmail = lc.userEmail where lc.categorySeq = :categorySeq AND a.startTime > :currentTime")
    List<Auction> findAllByStartTimeAndCategorySeq(@Param("categorySeq")int categorySeq, @Param("currentTime")String currentTime,
            Pageable pageable);



}
