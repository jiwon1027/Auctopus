package com.auctopus.project.api.service;

import com.auctopus.project.common.exception.auction.AuctionNotFoundException;
import com.auctopus.project.common.exception.code.ErrorCode;
import com.auctopus.project.db.domain.Auction;
import com.auctopus.project.db.domain.Notification;
import com.auctopus.project.db.repository.AuctionRepository;
import com.auctopus.project.db.repository.NotificationRepository;
import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    private TaskScheduler taskScheduler;
    private MailSender mailSender;

    @Override
    public void scheduleNotification(String userEmail, int auctionSeq) {
        Auction auction = auctionRepository.findByAuctionSeq(auctionSeq).orElseThrow(
                () -> new AuctionNotFoundException(
                        "auction with auctionSeq " + auctionSeq + " not found",
                        ErrorCode.AUCTION_NOT_FOUND));
        // 지정된 시간에 실행될 Runnable 설정해준다
        Timestamp mailTime = Timestamp.valueOf(
                auction.getStartTime().toLocalDateTime().minusMinutes(10));
        taskScheduler.schedule(new SendNotification(userEmail, auction), mailTime);
    }

    @Override
    public void sendEmail(String userEmail, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(userEmail);
        mail.setFrom("auctopus@autopus.com");
        mail.setSubject("[Auctopus] 찜해놓은 경매의 라이브 오픈 안내 드립니다.");
        mail.setText(message);
        mailSender.send(mail);
    }

    @Override
    @Transactional
    public void createNotification(String userEmail, String message) {
        Notification notification = Notification.builder().userEmail(userEmail)
                .representativeImageUrl("").message(message).build();
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationList(String userEmail) {
        List<Notification> notificationList = notificationRepository.findNotificationListByUserEmail(
                userEmail);
        return notificationList;
    }

    @Override
    @Transactional
    public void deleteNotification(String userEmail, int notificationSeq) {
        Notification notification = notificationRepository.findByNotificationSeq(notificationSeq);
        notificationRepository.delete(notification);
    }

    @AllArgsConstructor
    class SendNotification implements Runnable {

        private String userEmail;
        private Auction auction;

        // 지정된 시간이 되면 run 메소드 안의 내용이 실행한다.
        @Override
        @Transactional
        public void run() {
            String message = "찜 목록의 '" + auction.getTitle() + "' 상품의 경매가 10분 뒤에 시작해요";

            sendEmail(userEmail, message);
            createNotification(userEmail, message);
        }
    }

}
