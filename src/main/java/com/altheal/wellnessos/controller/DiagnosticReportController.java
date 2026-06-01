package com.altheal.wellnessos.controller;

import com.altheal.wellnessos.model.dto.request.DiagnosticReportRequest;
import com.altheal.wellnessos.model.dto.response.DiagnosticReportResponse;
import com.altheal.wellnessos.service.DiagnosticReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Diagnostic Reports", description = "Biometric recovery report generation and retrieval")
public class DiagnosticReportController {

    private final DiagnosticReportService reportService;

    @Operation(summary = "Generate a new diagnostic report from biometric scores")
    @PostMapping
    public ResponseEntity<DiagnosticReportResponse> generateReport(
            @Valid @RequestBody DiagnosticReportRequest request) {
        log.info("REST invocation: Generating diagnostic report for memberId: {}", request.getMemberId());
        DiagnosticReportResponse response = reportService.generateReport(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get paginated diagnostic reports for a specific member")
    @GetMapping("/member/{memberId}")
    public ResponseEntity<Page<DiagnosticReportResponse>> getReportsForMember(
            @PathVariable String memberId,
            @PageableDefault(size = 10, sort = "generatedAt") Pageable pageable) {
        log.info("REST invocation: Fetching reports for memberId: {}", memberId);
        return ResponseEntity.ok(reportService.getReportsForMember(memberId, pageable));
    }

    @Operation(summary = "Get a single diagnostic report by its ID")
    @GetMapping("/{reportId}")
    public ResponseEntity<DiagnosticReportResponse> getReportById(@PathVariable String reportId) {
        log.info("REST invocation: Fetching diagnostic report: {}", reportId);
        return ResponseEntity.ok(reportService.getReportById(reportId));
    }

    @Operation(summary = "Count critical burnout reports flagged for a member")
    @GetMapping("/member/{memberId}/critical-count")
    public ResponseEntity<Map<String, Object>> countCriticalReports(@PathVariable String memberId) {
        long count = reportService.countCriticalReportsForMember(memberId);
        return ResponseEntity.ok(Map.<String, Object>of(
                "memberId", memberId,
                "criticalReportCount", count
        ));
    }
}
