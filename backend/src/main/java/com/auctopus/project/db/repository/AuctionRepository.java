package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Auction;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    Optional<Auction> findByAuctionSeq(int auctionSeq);
    Auction findFirstByUserEmail(String userEmail);
    // 시청자수로 sort
    @Query("SELECT distinct a FROM Auction a JOIN Live l on l.liveSeq = a.auctionSeq where a.state = :state ORDER BY l.viewer desc")
    List<Auction> findAllAuctionByViewer(@Param("state") int state);

    // 좋아요로 sort
//    @Query("SELECT a FROM Auction a where (a.title like CONCAT('%', : word, '%') OR a.content like CONCAT('%', :word, '%')) AND a.state = :state ORDER BY a.likeCount")
    @Query("SELECT a FROM Auction a where a.state = :state ORDER BY a.likeCount desc")
    List<Auction> findAllAuctionByLikeCount(@Param("state") int state);

    // 카테고리(관심)별 경매 리스트를 리턴하는 query
    @Query("SELECT a FROM Auction a WHERE a.categorySeq = :categorySeq AND a.state = :state ORDER BY a.title")
    List<Auction> findAuctionByCategorySeq(@Param("categorySeq")int categorySeq, @Param("state") int state);

    // state에 따라 시작시간 순서로 정렬
    @Query("SELECT a FROM Auction a WHERE a.state = :state ORDER BY a.startTime"  )
    List<Auction> findAllAuctionByStartTime(@Param("state") int state);


    // word
    @Query("SELECT distinct a FROM Auction a JOIN Live l on l.liveSeq = a.auctionSeq WHERE (a.title like CONCAT('%', : word, '%') OR a.content like CONCAT('%', :word, '%')) AND a.state = :state ORDER BY l.viewer desc")
    List<Auction> findAllAuctionByViewerAndWord(@Param("word") String word, @Param("state") int state);

    @Query("SELECT a FROM Auction a WHERE (a.title like CONCAT('%', : word, '%') OR a.content like CONCAT('%', :word, '%')) AND a.state = :state ORDER BY a.likeCount desc")
    List<Auction> findAllAuctionByLikeCountAndWord(@Param("word") String word, @Param("state") int state);


    // category
    @Query("SELECT distinct a from Auction a JOIN Live l on l.liveSeq = a.auctionSeq WHERE a.categorySeq = :category AND a.state = :state ORDER BY l.viewer desc")
    List<Auction> findAllAuctionByViewerAndCategory(@Param("category") int category, @Param("state") int state);

    @Query("SELECT a from Auction a WHERE a.categorySeq = :category AND a.state = :state ORDER BY a.likeCount desc")
    List<Auction> findAllAuctionByLikeCountAndCategory(@Param("category") int category, @Param("state") int state);


    // 내 옥션
    @Query("SELECT a FROM Auction a WHERE a.userEmail = :Email and a.state = 0 order by a.startTime")
    List<Auction> findAllAuctionByEmail(@Param("Email") String Email);
}
