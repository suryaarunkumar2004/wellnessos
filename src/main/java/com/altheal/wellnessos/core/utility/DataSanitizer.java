package com.altheal.wellnessos.core.utility;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class DataSanitizer {
    private static final String SYSTEM_SERIAL_REGEX = "^ATH-WN-\\d{5}$";
    private static final Pattern ENTIRE_PATTERN = Pattern.compile(SYSTEM_SERIAL_REGEX);
    public String secureEmailString(String rawEmail) {
        if (rawEmail == null || !rawEmail.contains("@")) {
            return "ERR_SECURE_MASK_FAILURE";
        }

        int separator = rawEmail.indexOf("@");
        String identityPrefix = rawEmail.substring(0, separator);
        String domainSuffix = rawEmail.substring(separator);

        if (identityPrefix.length() <= 2) {
            return identityPrefix.charAt(0) + "***" + domainSuffix;
        }

        return identityPrefix.charAt(0) +
                "*".repeat(identityPrefix.length() - 2) +
                identityPrefix.charAt(identityPrefix.length() - 1) +
                domainSuffix;
    }

    public boolean verifyEnrolledProtocolFormat(String structuralId) {
        if (structuralId == null) {
            return false;
        }
        Matcher contextualMatcher = ENTIRE_PATTERN.matcher(structuralId);
        return contextualMatcher.matches();
    }
}
