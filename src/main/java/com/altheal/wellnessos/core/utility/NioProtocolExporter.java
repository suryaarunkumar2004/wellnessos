package com.altheal.wellnessos.core.utility;

import com.altheal.wellnessos.core.domain.BiometricSnapshot;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class NioProtocolExporter {

    public void compileReportToDisk(String storageRoute, String outputName, List<BiometricSnapshot> items) throws IOException {
        if (storageRoute == null || outputName == null || items == null) {
            throw new IllegalArgumentException("File generation parameters cannot contain null references.");
        }

        Path safeDirectoryPath = Path.of(storageRoute);

        if (!Files.exists(safeDirectoryPath)) {
            Files.createDirectories(safeDirectoryPath);
        }

        Path targetDestinationFile = safeDirectoryPath.resolve(outputName);

        List<String> operationalLines = items.stream()
                .map(item -> String.format("[TIMESTAMP: %s] | TRACKING_ID: %s | METRIC: %d | HRV: %.1f ms | CLASSIFICATION: %s",
                        item.capturedAt(), item.snapshotId(), item.score(), item.heartRateVariability(), item.evaluationTag()))
                .toList();

        Files.write(
                targetDestinationFile,
                operationalLines,
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING
        );
    }
}
