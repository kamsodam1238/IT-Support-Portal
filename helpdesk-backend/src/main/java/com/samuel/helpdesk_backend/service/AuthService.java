package com.samuel.helpdesk_backend.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import com.samuel.helpdesk_backend.model.LoginRequest;
import com.samuel.helpdesk_backend.model.User;
import com.samuel.helpdesk_backend.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return Map.of(
                "success", false,
                "message", "User not found."
            );
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
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
