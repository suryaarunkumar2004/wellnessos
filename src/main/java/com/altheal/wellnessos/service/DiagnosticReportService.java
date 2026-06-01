package com.altheal.wellnessos.service;

import com.altheal.wellnessos.model.dto.request.DiagnosticReportRequest;
import com.altheal.wellnessos.model.dto.response.DiagnosticReportResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiagnosticReportService {

    DiagnosticReportResponse generateReport(DiagnosticReportRequest request);

    Page<DiagnosticReportResponse> getReportsForMember(String memberId, Pageable pageable);

    DiagnosticReportResponse getReportById(String reportId);

    long countCriticalReportsForMember(String memberId);
}
