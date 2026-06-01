package com.altheal.wellnessos.security.user;

import com.altheal.wellnessos.model.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {

    @Serial
    private static final long serialVersionUID = 301L;

    @Getter
    private final Long id;

    @Getter
    private final String fullName;

    @Getter
    private final String email;

    @JsonIgnore
    private final String password;

    @Getter
    private final String clientTrackingToken;

    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String fullName, String email, String password,
                           String clientTrackingToken, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.clientTrackingToken = clientTrackingToken;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(Member member) {
        Objects.requireNonNull(member, "Cannot map user validation context frames from a null member reference.");

        List<GrantedAuthority> dynamicAuthorities = member.getRoles().stream()
                .map(role -> (GrantedAuthority) new SimpleGrantedAuthority(role.getName()))
                .toList();

        return new UserDetailsImpl(
                member.getId(),
                member.getFullName(),
                member.getEmail(),
                member.getPassword(),
                member.getClientTrackingToken(),
                dynamicAuthorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
