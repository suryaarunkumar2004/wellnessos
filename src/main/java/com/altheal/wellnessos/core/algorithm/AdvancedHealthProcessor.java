package com.altheal.wellnessos.core.algorithm;

import com.altheal.wellnessos.core.domain.BiometricSnapshot;
import com.altheal.wellnessos.core.exception.InvalidDosageException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

@Component
public class AdvancedHealthProcessor {

    public double calculateSystemicRecoveryIndex(List<BiometricSnapshot> systemDataLog) throws InvalidDosageException {
        if (systemDataLog == null || systemDataLog.isEmpty()) {
            return 0.0;
        }

        // Validate all scores upfront before stream processing
        for (BiometricSnapshot snapshot : systemDataLog) {
            int scoreValue = snapshot.score();
            if (scoreValue < 1 || scoreValue > 10) {
                throw new InvalidDosageException(
                        "Failed to run metric transformation calculations: Corrupted biometric node value: " + scoreValue);
            }
        }

        OptionalDouble aggregateMean = systemDataLog.stream()
                .filter(snapshot -> snapshot.capturedAt() != null)
                .mapToInt(BiometricSnapshot::score)
                .average();

        return aggregateMean.orElse(0.0);
    }

    public String classifyNervousSystemState(Object physiologicalVariable) {
        if (physiologicalVariable == null) {
            return "PAYLOAD_NULL_VOID: Diagnostics execution token missing initialization reference context.";
        }
        if (physiologicalVariable instanceof Integer nervousLevel) {
            if (nervousLevel >= 8) {
                return "OPTIMAL_VAGAL_TONE: Autonomic nervous system demonstrates exceptional parasympathetic regulation.";
            } else if (nervousLevel >= 5) {
                return "MODERATE_SYMPATHETIC_ACTIVATION: Client displaying baseline professional burnout signs.";
            } else {
                return "CRITICAL_ADRENAL_EXHAUSTION: High sympathetic lock. Immediate clinical lifestyle modification required.";
            }
        }
        if (physiologicalVariable instanceof Double hrvReading && hrvReading < 25.5) {
            return "CRITICAL_HRV_COMPRESSION: Low autonomic micro-fluctuations. High fatigue profile verified.";
        }
        if (physiologicalVariable instanceof String assessmentLog && assessmentLog.isBlank()) {
            return "INCOMPLETE_INTAKE: Practitioner subjective reporting text field was left empty.";
        }
        return "UNSUPPORTED_DATA_METRIC: Evaluated signature structure type maps to an unclassified health entity format.";
    }

    public Map<String, List<BiometricSnapshot>> bucketSnapshotsByTag(List<BiometricSnapshot> catalog) {
        return catalog.stream()
                .collect(Collectors.groupingBy(BiometricSnapshot::evaluationTag));
    }
}