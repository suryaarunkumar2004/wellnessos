package com.wellnessos.config;

import com.wellnessos.entity.User;
import com.wellnessos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setName("Surya Arunkumar");
            user.setEmail("surya.arun2004@gmail.com");
            user.setPassword(passwordEncoder.encode("password123"));
            user.setPhone("+91 9876543210");
            user.setDob("2004-01-01");
            user.setGender("Male");
            user.setAddress("123 Wellness Street");
            user.setCity("Coimbatore");
            user.setCountry("India");
            user.setRole("PATIENT");
            user.setIsActive(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("✅ Default user created: surya.arun2004@gmail.com / password123");
        }
    }
}
