package com.samuel.helpdesk_backend.service;

import java.util.Map;
import com.samuel.helpdesk_backend.model.SignupRequest;

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

    public Map<String, Object> signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return Map.of(
                    "success", false,
                    "message", "An account with this email already exists.");
        }

        User newUser = new User();
        newUser.setName(signupRequest.getName().trim());
        newUser.setEmail(signupRequest.getEmail().trim().toLowerCase());
        newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        newUser.setRole("EMPLOYEE");
        newUser.setCreatedAt(java.time.LocalDateTime.now().toString());
        newUser.setPermanentAccount(false);

        userRepository.save(newUser);

        return Map.of(
                "success", true,
                "message", "Account created successfully.");
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
