package com.auctopus.project.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 유저 관련 오류
    USER_NOT_FOUND(404, "USER_ERR_404", "해당 유저를 찾을 수 없습니다."),


    // 경매방 관련 오류
    AUCTION_NOT_FOUND(404, "AUCTION_ERR_404", "해당 경매방을 찾을 수 없습니다.");

    private int state;
    private String message;
    private String errorCode;
}
