package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Notification;
import com.auctopus.project.db.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

@Service
public class NotificationServiceImpl implements NotificationService{


    @Autowired
    private NotificationRepository notificationRepository;
    private MailSender mailSender;

    @Override
    @Transactional
    public void createNotification(int auctionSeq) {
        // 라이크 옥션이 나와야 추가 가능
    }

    @Override
    public void sendEmail(String userEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setFrom("auctopus@autopus.com");
        message.setSubject("[Auctopus] 찜해놓은 경매의 라이브 오픈 안내 드립니다.");
        message.setText("찜해놓은 경매의 라이브 오픈 안내 드립니다.");
        mailSender.send(message);
    }
}
