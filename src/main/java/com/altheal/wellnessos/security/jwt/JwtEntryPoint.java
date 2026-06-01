package com.altheal.wellnessos.security.jwt;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Slf4j
public class JwtEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        String requestPathUri = request.getRequestURI() != null ? request.getRequestURI() : "UNKNOWN_PATH";
        log.error("Unauthorized connection interception block triggered at path [{}] | Reason: {}", requestPathUri, authException.getMessage());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        String localizedTimestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        StringBuilder jsonPayloadBuilder = new StringBuilder();
        jsonPayloadBuilder.append("{\n");
        jsonPayloadBuilder.append("  \"timestamp\": \"").append(localizedTimestamp).append("\",\n");
        jsonPayloadBuilder.append("  \"errorCode\": \"ALTH-UNAUTHORIZED-ACCESS\",\n");
        jsonPayloadBuilder.append("  \"message\": \"Access Rejected: Authentication credentials token verification failed or expired.\",\n");
        jsonPayloadBuilder.append("  \"requestedPath\": \"").append(requestPathUri).append("\"\n");
        jsonPayloadBuilder.append("}");

        try (PrintWriter outputStreamWriter = response.getWriter()) {
            outputStreamWriter.print(jsonPayloadBuilder);
            outputStreamWriter.flush();
        }
    }
}
