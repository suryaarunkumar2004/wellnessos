package com.altheal.wellnessos.controller;

import com.altheal.wellnessos.model.dto.request.LoginRequest;
import com.altheal.wellnessos.model.dto.response.JwtResponse;
import com.altheal.wellnessos.security.jwt.JwtUtils;
import com.altheal.wellnessos.security.user.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@Tag(name = "Authentication", description = "JWT login and session management")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = Objects.requireNonNull(authenticationManager,
                "AuthenticationManager cannot bind to null elements.");
        this.jwtUtils = Objects.requireNonNull(jwtUtils,
                "JwtUtils cryptographic component cannot bind to null elements.");
    }

    @Operation(summary = "Authenticate a user and obtain a signed JWT access token")
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("REST authorization invocation: Login pipeline initiated for user email identifier: {}",
                loginRequest.getEmail());

        try {
            UsernamePasswordAuthenticationToken parameterToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail().strip().toLowerCase(),
                    loginRequest.getPassword()
            );

            Authentication transactionalAuthenticationResult = authenticationManager.authenticate(parameterToken);

            SecurityContextHolder.getContext().setAuthentication(transactionalAuthenticationResult);

            String secureJwtStringToken = jwtUtils.generateJwtToken(transactionalAuthenticationResult.getName());

            UserDetailsImpl userPrincipalNode =
                    (UserDetailsImpl) transactionalAuthenticationResult.getPrincipal();

            List<String> collectedGrantedRoles = Objects.requireNonNull(userPrincipalNode)
                    .getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            log.info("Login sequence successful for user [{}]. Dispatching cryptographically signed authorization token.",
                    userPrincipalNode.getEmail());

            JwtResponse finalSecurityPayloadResponse = new JwtResponse(
                    secureJwtStringToken,
                    userPrincipalNode.getId(),
                    userPrincipalNode.getFullName(),
                    userPrincipalNode.getEmail(),
                    collectedGrantedRoles
            );

            return ResponseEntity.ok(finalSecurityPayloadResponse);

        } catch (BadCredentialsException credentialException) {
            log.warn("Security Alert: Failed login tracking vector processing email: {} - Reason: Invalid credentials.",
                    loginRequest.getEmail());
            throw new BadCredentialsException(
                    "Authentication failed: Enforced email or secret password does not match clinical records.",
                    credentialException);
        }
    }
}
