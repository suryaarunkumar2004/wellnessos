package com.altheal.wellnessos.security.user;

import com.altheal.wellnessos.model.entity.Member;
import com.altheal.wellnessos.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    public UserDetailsServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = Objects.requireNonNull(memberRepository, "Member repository query connection broker is required.");
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email.strip().toLowerCase())
                .orElseThrow(() -> new UsernameNotFoundException("Security Authentication Denied: User account matching [ " + email + " ] not found."));

        return UserDetailsImpl.build(member);
    }
}
