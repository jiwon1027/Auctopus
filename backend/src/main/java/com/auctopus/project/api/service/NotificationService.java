package com.auctopus.project.api.service;

/**
 * 알림 관련 로직 처리를 위한 서비스 구현
 */
public interface NotificationService {

    // 알림 생성
    void createNotification(int auctionSeq);

    // 이메일 알람 보내기
    void sendEmail(String userEmail);
}
