package com.altheal.wellnessos.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "diagnostic_reports")
@Getter
@Setter
@NoArgsConstructor
public class DiagnosticReportEntity {

    @Id
    @Column(name = "report_id", nullable = false, length = 50)
    private String reportId;

    @Column(name = "member_id", nullable = false, length = 50)
    private String memberId;

    @Column(name = "calculated_recovery_index", nullable = false)
    private double calculatedRecoveryIndex;

    @Column(name = "peak_hrv", nullable = false)
    private double peakHeartRateVariability;

    @Column(name = "baseline_hrv", nullable = false)
    private double baselineHeartRateVariability;

    @Column(name = "hrv_spike_delta", nullable = false)
    private double hrvSpikeDelta;

    @Column(name = "critical_burnout_indicated", nullable = false)
    private boolean criticalBurnoutIndicated;

    @Column(name = "systemic_summary_notes", length = 500)
    private String systemicSummaryNotes;

    @CreationTimestamp
    @Column(name = "generated_at", nullable = false, updatable = false)
    private LocalDateTime generatedAt;
}
