package com.altheal.wellnessos.service;

import com.altheal.wellnessos.model.dto.response.CoachResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CoachService {

    Page<CoachResponse> getAllCoaches(Pageable pageable);

    CoachResponse getCoachById(Long id);

    CoachResponse assignMemberToCoach(Long memberId, Long coachId);
}
