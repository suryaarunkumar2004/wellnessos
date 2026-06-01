package com.altheal.wellnessos.controller.exception;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidDosageException.class)
    public ResponseEntity<ErrorDetails> handleInvalidDosageException(InvalidDosageException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                "ALTH-INSUFFICIENT-OR-INVALID-DOSAGE",
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidationException(MethodArgumentNotValidException ex, WebRequest request) {
        String concatenatedErrors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> String.format("[%s: %s]", err.getField(), err.getDefaultMessage()))
                .collect(Collectors.joining(", "));

        ErrorDetails error = new ErrorDetails(
                "ALTH-PAYLOAD-VALIDATION-FAILED",
                "Input constraints validation failed: " + concatenatedErrors,
                request.getDescription(false)
        );
        return ResponseEntity.status(422).body(error);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorDetails> handleNotFoundException(NoSuchElementException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                "ALTH-RESOURCE-NOT-FOUND",
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorDetails> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                "ALTH-INVALID-REQUEST-ARGUMENT",
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDetails> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                "ALTH-AUTHENTICATION-FAILED",
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalGenericException(Exception ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                "ALTH-INTERNAL-SERVER-SYSTEM-ERROR",
                "An unexpected critical condition occurred on the server.",
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, INTERNAL_SERVER_ERROR);
    }
}
