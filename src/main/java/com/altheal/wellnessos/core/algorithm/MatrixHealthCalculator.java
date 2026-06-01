package com.altheal.wellnessos.core.algorithm;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import org.springframework.stereotype.Component;

@Component
public class MatrixHealthCalculator {

    /**
     * Calculates the average recovery score across all cells of a biometric matrix.
     * Each cell value must be in the range [0, 10].
     *
     * @param matrix 2-D biometric score matrix; null or empty yields 0.0
     * @return the average score, or 0.0 if the matrix is empty
     * @throws InvalidDosageException if any cell value falls outside [0, 10]
     */
    public double calculateAverageRecoveryScore(int[][] matrix) throws InvalidDosageException {
        if (matrix == null || matrix.length == 0) {
            return 0.0;
        }

        long totalSum = 0;
        int count = 0;

        for (int[] row : matrix) {
            if (row == null) {
                continue;
            }
            for (int val : row) {
                if (val < 0 || val > 10) {
                    throw new InvalidDosageException("Out-of-bounds biometric value detected: " + val);
                }
                totalSum += val;
                count++;
            }
        }

        if (count == 0) {
            return 0.0;
        }

        return (double) totalSum / count;
    }
}
