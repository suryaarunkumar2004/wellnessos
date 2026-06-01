package com.altheal.wellnessos.service;

import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.core.utility.DataSanitizer;
import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import com.altheal.wellnessos.repository.MemberRepository;
import com.altheal.wellnessos.service.implementation.MemberServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private DataSanitizer dataSanitizer;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberServiceImpl memberService;

    @Test
    @DisplayName("Should smoothly onboard new member and generate a profile DTO when input structural strings pass checks")
    void registerNewMember_Success() throws InvalidDosageException {
        MemberSignupRequest mockPayload = new MemberSignupRequest();
        mockPayload.setFullName("Arjun Mehta");
        mockPayload.setEmail("arjun@althealindia.in");
        mockPayload.setPassword("SecurePass123");
        mockPayload.setClientTrackingToken("ATH-WN-10250");

        when(dataSanitizer.verifyEnrolledProtocolFormat("ATH-WN-10250")).thenReturn(true);
        when(memberRepository.existsByClientTrackingToken("ATH-WN-10250")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("$2a$11$hashedPassword");
        when(dataSanitizer.secureEmailString(anyString())).thenReturn("a****n@althealindia.in");
        when(memberRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        MemberProfileResponse profileResponse = memberService.registerNewMember(mockPayload);

        assertNotNull(profileResponse, "Returned member profile response must not be null.");
        assertEquals("Arjun Mehta", profileResponse.getFullName());

        verify(dataSanitizer, times(1)).verifyEnrolledProtocolFormat(anyString());
        verify(passwordEncoder, times(1)).encode(anyString());
        verify(memberRepository, times(1)).save(any());
    }
}
