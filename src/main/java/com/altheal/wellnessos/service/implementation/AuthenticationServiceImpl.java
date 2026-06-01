package com.altheal.wellnessos.service.implementation;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.core.utility.DataSanitizer;
import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import com.altheal.wellnessos.repository.MemberRepository;
import com.altheal.wellnessos.service.AuthenticationService;
import com.altheal.wellnessos.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    private final MemberRepository memberRepository;
    private final DataSanitizer dataSanitizer;
    private final MemberService memberService;

    public AuthenticationServiceImpl(MemberRepository memberRepository,
                                     DataSanitizer dataSanitizer,
                                     MemberService memberService) {
        this.memberRepository = Objects.requireNonNull(memberRepository,
                "Member repository broker required.");
        this.dataSanitizer = Objects.requireNonNull(dataSanitizer,
                "String validation scanner required.");
        this.memberService = Objects.requireNonNull(memberService,
                "MemberService delegate required.");
    }

    @Override
    public MemberProfileResponse registerMember(MemberSignupRequest request) {
        log.info("AuthenticationService: Delegating member registration for token: {}",
                request.getClientTrackingToken());
        try {
            return memberService.registerNewMember(request);
        } catch (InvalidDosageException e) {
            log.error("AuthenticationService: Registration failed — {}", e.getMessage());
            throw new IllegalArgumentException("Member registration failed: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean isTokenAlreadyRegistered(String clientTrackingToken) {
        if (!dataSanitizer.verifyEnrolledProtocolFormat(clientTrackingToken)) {
            return false;
        }
        return memberRepository.existsByClientTrackingToken(clientTrackingToken);
    }
}
