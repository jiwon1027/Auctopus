package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.LikeCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCategoryRepository extends JpaRepository<LikeCategory, Long> {
    List<LikeCategory> findAllByEmail(String email);
}
