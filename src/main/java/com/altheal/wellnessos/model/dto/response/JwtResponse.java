package com.altheal.wellnessos.model.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class JwtResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 202L;

    @Setter
    @Getter
    private String accessToken;
    @Setter
    @Getter
    private String tokenTypePrefix;
    @Setter
    @Getter
    private Long accountId;
    @Setter
    @Getter
    private String clientFullName;
    @Setter
    @Getter
    private String authenticatedEmail;
    private List<String> authorizedRoles;

    public JwtResponse(String accessToken, Long accountId, String clientFullName, String authenticatedEmail, List<String> authorizedRoles) {
        this.accessToken = accessToken;
        this.tokenTypePrefix = "Bearer";
        this.accountId = accountId;
        this.clientFullName = clientFullName;
        this.authenticatedEmail = authenticatedEmail;
        this.authorizedRoles = authorizedRoles != null ? new ArrayList<>(authorizedRoles) : new ArrayList<>();
    }

    public List<String> getAuthorizedRoles() {
        return Collections.unmodifiableList(this.authorizedRoles);
    }

    public void setAuthorizedRoles(List<String> roles) {
        this.authorizedRoles = roles != null ? new ArrayList<>(roles) : new ArrayList<>();
    }

    @Override
    public String toString() {
        return String.format("JwtResponse[Id: %d | Identity: %s | Systemic Roles: %s | Token: [JWT_ENCRYPTED_STREAM]]",
                this.accountId, this.authenticatedEmail, this.authorizedRoles);
    }
}
