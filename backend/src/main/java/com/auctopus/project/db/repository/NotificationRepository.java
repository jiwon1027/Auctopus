package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    Notification findByNotificationSeq(int NotificationSeq);

    @Query("SELECT a FROM Notification a WHERE a.userEmail = ?1")
    List<Notification> findNotificationListByUserEmail(String userEmail);

}
