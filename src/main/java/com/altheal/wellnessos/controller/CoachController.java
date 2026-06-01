package com.altheal.wellnessos.controller;

import com.altheal.wellnessos.model.dto.response.CoachResponse;
import com.altheal.wellnessos.service.CoachService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Coaches", description = "Coach profile management and member assignment")
public class CoachController {

    private final CoachService coachService;

    @Operation(summary = "Get all coaches (paginated)")
    @GetMapping("/api/v1/coaches")
    public ResponseEntity<Page<CoachResponse>> getAllCoaches(
            @PageableDefault(size = 20, sort = "fullName") Pageable pageable) {
        log.info("REST invocation: Listing all coaches");
        return ResponseEntity.ok(coachService.getAllCoaches(pageable));
    }

    @Operation(summary = "Get a single coach by ID")
    @GetMapping("/api/v1/coaches/{id}")
    public ResponseEntity<CoachResponse> getCoachById(@PathVariable Long id) {
        log.info("REST invocation: Fetching coach ID: {}", id);
        return ResponseEntity.ok(coachService.getCoachById(id));
    }

    @Operation(summary = "Assign a member to a coach (COACH or DOCTOR role required)")
    @PatchMapping("/api/v1/members/{memberId}/assign-coach/{coachId}")
    @PreAuthorize("hasAnyRole('COACH', 'DOCTOR')")
    public ResponseEntity<CoachResponse> assignMemberToCoach(
            @PathVariable Long memberId,
            @PathVariable Long coachId) {
        log.info("REST invocation: Assigning member ID {} to coach ID {}", memberId, coachId);
        return ResponseEntity.ok(coachService.assignMemberToCoach(memberId, coachId));
    }
}
