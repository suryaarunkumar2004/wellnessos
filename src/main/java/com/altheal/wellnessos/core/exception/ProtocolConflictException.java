package com.altheal.wellnessos.core.exception;

import lombok.Getter;

import java.io.Serial;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ProtocolConflictException extends Exception {

    @Serial
    private static final long serialVersionUID = 2L;
    @Getter
    private final LocalDateTime conflictTimestamp;
    @Getter
    private final String conflictingProtocolId;
    @Getter
    private final String activeProtocolId;
    private final Map<String, Object> operationalMetadata;

    public ProtocolConflictException(String message, String conflictingProtocolId, String activeProtocolId) {
        super(message);
        this.conflictTimestamp = LocalDateTime.now();
        this.conflictingProtocolId = conflictingProtocolId != null ? conflictingProtocolId : "UNKNOWN_CONFLICT_ID";
        this.activeProtocolId = activeProtocolId != null ? activeProtocolId : "UNKNOWN_ACTIVE_ID";
        this.operationalMetadata = new HashMap<>();
    }

    public ProtocolConflictException(String message, String conflictingProtocolId, String activeProtocolId, Map<String, Object> structuralContext) {
        super(message);
        this.conflictTimestamp = LocalDateTime.now();
        this.conflictingProtocolId = conflictingProtocolId != null ? conflictingProtocolId : "UNKNOWN_CONFLICT_ID";
        this.activeProtocolId = activeProtocolId != null ? activeProtocolId : "UNKNOWN_ACTIVE_ID";
        this.operationalMetadata = structuralContext != null ? new HashMap<>(structuralContext) : new HashMap<>();
    }

    public Map<String, Object> getOperationalMetadata() {
        return Collections.unmodifiableMap(this.operationalMetadata);
    }

    public String getFormattedSystemicErrorLog() {
        DateTimeFormatter executionFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        return String.format("[CONFLICT_EXCEPTION] Occurred: %s | Active Protocol Block: %s | Attempted Injection Target: %s | Summary: %s",
                this.conflictTimestamp.format(executionFormatter),
                this.activeProtocolId,
                this.conflictingProtocolId,
                this.getMessage()
        );
    }
}
