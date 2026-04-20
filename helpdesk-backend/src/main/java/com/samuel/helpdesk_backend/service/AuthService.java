package com.samuel.helpdesk_backend.service;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.samuel.helpdesk_backend.model.LoginRequest;
import com.samuel.helpdesk_backend.model.User;
import com.samuel.helpdesk_backend.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, 
        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return Map.of(
                "success", false,
                "message", "User not found."
            );
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return Map.of(
                    "success", false,
                    "message", "Invalid password.");
        }

        return Map.of(
            "success", true,
            "message", "Login successful",
            "userId", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole()
        );
    }
}
