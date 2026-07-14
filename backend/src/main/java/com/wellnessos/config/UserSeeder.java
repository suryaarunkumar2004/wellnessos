package com.wellnessos.config;

import com.wellnessos.entity.User;
import com.wellnessos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class UserSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUserIfNotExists("surya.arun2004@gmail.com", "Surya Arunkumar", "password123", "PATIENT", "+15550192834");
        seedUserIfNotExists("demo@wellnest.com", "Demo User", "password123", "USER", "+15550192835");
        seedUserIfNotExists("admin@wellnest.com", "System Admin", "password123", "ADMIN", "+15550192836");
    }

    private void seedUserIfNotExists(String email, String name, String rawPassword, String role, String phone) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole(role);
            user.setPhone(phone);
            user.setCity("Houston");
            user.setCountry("USA");
            user.setDob(LocalDate.of(2004, 7, 13));
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("✅ Default user seeded: " + email);
        }
    }
}
