package com.altheal.wellnessos.service.implementation;

import com.altheal.wellnessos.model.dto.response.CoachResponse;
import com.altheal.wellnessos.model.entity.Coach;
import com.altheal.wellnessos.model.entity.Member;
import com.altheal.wellnessos.repository.CoachRepository;
import com.altheal.wellnessos.repository.MemberRepository;
import com.altheal.wellnessos.service.CoachService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class CoachServiceImpl implements CoachService {

    private final CoachRepository coachRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<CoachResponse> getAllCoaches(Pageable pageable) {
        return coachRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public CoachResponse getCoachById(Long id) {
        return coachRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new NoSuchElementException("Coach not found with ID: " + id));
    }

    @Override
    @Transactional
    public CoachResponse assignMemberToCoach(Long memberId, Long coachId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("Member not found with ID: " + memberId));

        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new NoSuchElementException("Coach not found with ID: " + coachId));

        member.setAssignedCoach(coach);
        memberRepository.save(member);

        log.info("Member ID {} successfully assigned to Coach ID {}", memberId, coachId);
        return toResponse(coach);
    }

    private CoachResponse toResponse(Coach coach) {
        return CoachResponse.builder()
                .id(coach.getId())
                .fullName(coach.getFullName())
                .email(coach.getEmail())
                .specialization(coach.getSpecialization())
                .memberCount(coach.getManagedMembers() != null ? coach.getManagedMembers().size() : 0)
                .build();
    }
}
