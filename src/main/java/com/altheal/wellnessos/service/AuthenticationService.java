package com.altheal.wellnessos.service;

import com.altheal.wellnessos.model.dto.request.MemberSignupRequest;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;

/**
 * Service contract for authentication-adjacent operations such as member
 * self-registration and profile lookup by tracking token.
 */
public interface AuthenticationService {

    /**
     * Register a new member via the authentication pathway
     * (equivalent to self-service onboarding).
     */
    MemberProfileResponse registerMember(MemberSignupRequest request);

    /**
     * Verify that a given client tracking token is already registered in the system.
     *
     * @param clientTrackingToken the token to check
     * @return true if the token is already associated with an active account
     */
    boolean isTokenAlreadyRegistered(String clientTrackingToken);
}
