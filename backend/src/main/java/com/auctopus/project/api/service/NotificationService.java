package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Auction;
import java.sql.Timestamp;

/**
 * 알림 관련 로직 처리를 위한 서비스 구현
 */
public interface NotificationService {

    // 라이브 시작 10분 전에 보낼 알림 예약하기
    void scheduleNotification(String userEmail, Auction auction);

    // 사용자에게 이메일 보내기
    void sendEmail(String userEmail, String message);

    // 사용자에게 보낸 알람 목록을 DB에 저장하기
    void createNotification(String userEmail, String message);

}
