package com.altheal.wellnessos.core;

import com.altheal.wellnessos.core.algorithm.MatrixHealthCalculator;
import com.altheal.wellnessos.core.exception.InvalidDosageException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MatrixHealthCalculatorTest {

    private MatrixHealthCalculator healthCalculator;

    @BeforeEach
    void setUp() {
        healthCalculator = new MatrixHealthCalculator();
    }

    @Test
    @DisplayName("Should successfully calculate mathematical mean when given valid 4x7 biometric data arrays")
    void calculateAverageRecoveryScore_Success() throws InvalidDosageException {
        int[][] healthyMatrix = new int[4][7];
        for (int week = 0; week < 4; week++) {
            for (int day = 0; day < 7; day++) {
                healthyMatrix[week][day] = 5;
            }
        }

        double calculatedMean = healthCalculator.calculateAverageRecoveryScore(healthyMatrix);

        assertEquals(5.0, calculatedMean, "The aggregate calculation mean must resolve precisely to 5.0.");
    }

    @Test
    @DisplayName("Should interrupt calculation and throw custom exception when out-of-bounds metrics are detected")
    void calculateAverageRecoveryScore_ThrowsInvalidDosageException() {
        int[][] corruptedMatrix = new int[4][7];
        corruptedMatrix[2][3] = 99;

        assertThrows(InvalidDosageException.class, () -> healthCalculator.calculateAverageRecoveryScore(corruptedMatrix), "An out-of-bounds marker value must trigger an explicit InvalidDosageException.");
    }
}
