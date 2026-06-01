package com.altheal.wellnessos.controller;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import com.altheal.wellnessos.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/onboard")
    public ResponseEntity<MemberProfileResponse> onboardNewMember(@Valid @RequestBody MemberSignupRequest signupRequest)
            throws InvalidDosageException {
        log.info("REST Web layer invocation: Onboarding endpoint triggered for email: {}", signupRequest.getEmail());

        MemberProfileResponse responseProfile = memberService.registerNewMember(signupRequest);
        return new ResponseEntity<>(responseProfile, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberProfileResponse> getMemberProfileById(@PathVariable("id") Long id) {
        log.info("REST Web layer invocation: Fetching profile data matching member numeric sequence ID: {}", id);

        MemberProfileResponse responseProfile = memberService.getMemberById(id);
        return ResponseEntity.ok(responseProfile);
    }

    @GetMapping("/coach/{coachId}")
    public ResponseEntity<Page<MemberProfileResponse>> getMembersRosterByCoachId(
            @PathVariable("coachId") Long coachId,
            @PageableDefault(sort = "id") Pageable pageable) {
        log.info("REST Web layer invocation: Requesting paginated member list records for Coach ID reference: {}", coachId);

        Page<MemberProfileResponse> paginatedResult = memberService.getMembersByCoach(coachId, pageable);
        return ResponseEntity.ok(paginatedResult);
    }
}
