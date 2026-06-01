package com.altheal.wellnessos.controller.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorDetails {
    private final LocalDateTime timestamp;
    private final String errorCode;
    private final String message;
    private final String details;

    public ErrorDetails(String errorCode, String message, String details) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.message = message;
        this.details = details;
    }

}
