package com.altheal.wellnessos.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MemberSignupRequest {

    @NotBlank(message = "FullName field cannot be omitted or left blank.")
    @Size(min = 2, max = 100, message = "Full name length must range tightly between 2 and 100 characters.")
    private String fullName;

    @NotBlank(message = "Contact registration email address is mandatory.")
    @Email(message = "Provided string format is not a recognized legal email structure.")
    private String email;

    @NotBlank(message = "Secure credential access passphrase is required.")
    @Size(min = 8, max = 64, message = "Secret password string must be between 8 and 64 characters long.")
    private String password;

    @NotBlank(message = "A structural onboarding client tracking token is mandatory.")
    @Pattern(regexp = "^ATH-WN-\\d{5}$", message = "System account tracking ID must strictly match format requirements: ATH-WN-XXXXX.")
    private String clientTrackingToken;

    private String role; // "ROLE_MEMBER" or "ROLE_COACH"
}
