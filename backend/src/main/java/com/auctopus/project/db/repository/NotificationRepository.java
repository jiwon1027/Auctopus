package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Notification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    Optional<Notification> findByNotificationSeq(int notificationSeq);

}
