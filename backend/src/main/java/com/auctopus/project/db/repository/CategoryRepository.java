package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByCategorySeq(int categorySeq);
    Category findByCategoryName(String categoryName);
}
