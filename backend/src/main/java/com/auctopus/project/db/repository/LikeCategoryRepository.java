package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.LikeCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCategoryRepository extends JpaRepository<LikeCategory, Integer> {
    List<LikeCategory> findAllByUserEmail(String userEmail);
}
