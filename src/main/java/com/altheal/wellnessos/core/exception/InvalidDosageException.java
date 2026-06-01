package com.altheal.wellnessos.core.exception;

import lombok.Getter;

import java.io.Serial;
import java.time.LocalDateTime;

@Getter
public class InvalidDosageException extends Exception {

    @Serial
    private static final long serialVersionUID = 1L;
    private final LocalDateTime errorTimestamp;

    public InvalidDosageException(String message) {
        super(message);
        this.errorTimestamp = LocalDateTime.now();
    }

}
