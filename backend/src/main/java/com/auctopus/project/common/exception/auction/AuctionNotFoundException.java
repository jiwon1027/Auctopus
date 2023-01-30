package com.auctopus.project.common.exception.auction;

import com.auctopus.project.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class AuctionNotFoundException extends RuntimeException{

    private ErrorCode errorCode;

    public AuctionNotFoundException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
