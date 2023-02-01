package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Auction;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    Optional<Auction> findByAuctionSeq(int auctionSeq);

    // 시청자수로 sort
    @Query("")
    List<Auction> findAllAuctionByViewer(@Param("word")String word, @Param("currentTime")String currentTime, @Param("state") int state);

    // 좋아요로 sort
    @Query("SELECT a FROM Auction a where (a.title like CONCAT('%', : word, '%') OR a.content like CONCAT('%', :word, '%')) AND (a.startTime > :currentTime) AND a.state = :state ORDER BY a.likeCount")
    List<Auction> findAllAuctionByLikeCount(@Param("word")String word, @Param("currentTime")String currentTime, @Param("state") int state);

    // 카테고리(관심)별 경매 리스트를 리턴하는 query
    @Query("SELECT a FROM Auction a WHERE a.categorySeq = :categorySeq AND a.startTime > :currentTime AND a.state = :state")
    List<Auction> findAuctionByCategorySeq(@Param("categorySeq")int categorySeq, @Param("currentTime")String currentTime, @Param("state") int state);

    @Query("SELECT a FROM Auction a WHERE a.startTime > :currentTime AND a.state = :state")
    List<Auction> findAllAuctionByStartTime(@Param("currentTime")String currentTime, @Param("state") int state);

}
