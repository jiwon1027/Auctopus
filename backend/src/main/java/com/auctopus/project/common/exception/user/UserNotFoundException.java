package com.auctopus.project.common.exception.user;

import com.auctopus.project.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException{

    private ErrorCode errorCode;

    public UserNotFoundException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

}
