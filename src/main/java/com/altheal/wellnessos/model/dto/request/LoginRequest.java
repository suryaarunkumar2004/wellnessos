package com.altheal.wellnessos.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
public class LoginRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 101L;

    @NotBlank(message = "Login email reference field cannot be omitted or left blank.")
    @Size(min = 5, max = 100, message = "Email character lengths must sit within 5 to 100 boundaries.")
    @Email(message = "Provided string format is not a recognized legal email structure matching standards.")
    private String email;

    @Setter
    @NotBlank(message = "Account authorization security passphrase is required.")
    @Size(min = 8, max = 64, message = "Password criteria requires a length between 8 and 64 characters.")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$",
            message = "Password security policy broken: Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    private String password;

    public LoginRequest() {}

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.strip().toLowerCase() : null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        LoginRequest that = (LoginRequest) obj;
        if (!Objects.equals(this.email, that.email)) return false;
        return Objects.equals(this.password, that.password);
    }

    @Override
    public int hashCode() {
        int outcome = 17;
        outcome = 31 * outcome + (email != null ? email.hashCode() : 0);
        outcome = 31 * outcome + (password != null ? password.hashCode() : 0);
        return outcome;
    }

    @Override
    public String toString() {
        return "LoginRequest[emailIdentifier=" + this.email + ", password= [PROTECTED_MASKED_STREAM] ]";
    }
}
