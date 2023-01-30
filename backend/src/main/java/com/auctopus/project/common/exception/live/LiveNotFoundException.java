package com.auctopus.project.common.exception.live;

import com.auctopus.project.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class LiveNotFoundException extends RuntimeException{

    private ErrorCode errorCode;

    public LiveNotFoundException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

}
