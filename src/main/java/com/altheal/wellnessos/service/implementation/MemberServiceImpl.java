package com.altheal.wellnessos.service.implementation;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.core.utility.DataSanitizer;
import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import com.altheal.wellnessos.model.entity.HealthHistory;
import com.altheal.wellnessos.model.entity.Member;
import com.altheal.wellnessos.model.entity.Role;
import com.altheal.wellnessos.repository.MemberRepository;
import com.altheal.wellnessos.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final DataSanitizer dataSanitizer;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public MemberProfileResponse registerNewMember(MemberSignupRequest request) throws InvalidDosageException {
        log.info("Initiating enterprise onboarding sequence for member tracking token: {}", request.getClientTrackingToken());

        if (!dataSanitizer.verifyEnrolledProtocolFormat(request.getClientTrackingToken())) {
            log.error("Aborting registration: Token format rule validation failure.");
            throw new InvalidDosageException("Client tracking token format is invalid.");
        }

        if (memberRepository.existsByClientTrackingToken(request.getClientTrackingToken())) {
            throw new IllegalArgumentException("Onboarding tracking token has already been claimed.");
        }

        Member member = getMember(request);

        Member savedMember = memberRepository.save(member);
        log.info("Successfully established member profile table row with generated identity ID: {}", savedMember.getId());

        return mapToResponse(savedMember);
    }

    private Member getMember(MemberSignupRequest request) {
        Member member = new Member();
        member.setFullName(request.getFullName());
        member.setEmail(request.getEmail());
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        member.setClientTrackingToken(request.getClientTrackingToken());

        HealthHistory profile = new HealthHistory();
        profile.setInitialBurnoutIndex(5);
        profile.setPrimaryHealthGoal("Holistic Burnout Recovery and Autonomic Stability");
        profile.setMember(member);
        member.setHealthHistory(profile);
        return member;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MemberProfileResponse> getMembersByCoach(Long coachId, Pageable pageable) {
        return memberRepository.findByAssignedCoachId(coachId, pageable)
                .map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberProfileResponse getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Target member record not found in system storage."));
        return mapToResponse(member);
    }

    private MemberProfileResponse mapToResponse(Member member) {
        return MemberProfileResponse.builder()
                .id(member.getId())
                .fullName(member.getFullName())
                .email(dataSanitizer.secureEmailString(member.getEmail()))
                .clientTrackingToken(member.getClientTrackingToken())
                .coachName(member.getAssignedCoach() != null ? member.getAssignedCoach().getFullName() : "Pending Assignment")
                .baselineBurnoutIndex(member.getHealthHistory() != null ? member.getHealthHistory().getInitialBurnoutIndex() : 0)
                .primaryHealthGoal(member.getHealthHistory() != null ? member.getHealthHistory().getPrimaryHealthGoal() : "Unassigned")
                .roles(member.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .createdAt(member.getCreatedAt())
                .build();
    }
}
