package com.altheal.wellnessos.service;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    MemberProfileResponse registerNewMember(MemberSignupRequest request) throws InvalidDosageException;

    Page<MemberProfileResponse> getMembersByCoach(Long coachId, Pageable pageable);

    MemberProfileResponse getMemberById(Long id);
}
