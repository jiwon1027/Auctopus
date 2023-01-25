package com.auctopus.project.db.repository;


import com.auctopus.project.db.domain.MyBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface MyBadgeRepository extends JpaRepository<MyBadge, Integer> {

}
