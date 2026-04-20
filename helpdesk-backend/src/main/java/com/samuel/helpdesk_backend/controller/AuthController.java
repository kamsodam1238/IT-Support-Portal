package com.samuel.helpdesk_backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.samuel.helpdesk_backend.model.LoginRequest;
import com.samuel.helpdesk_backend.service.AuthService;

@RestController
@CrossOrigin(origins = { "http://localhost:5173",
        "https://YOUR-VERCEL-FRONTEND-URL.vercel.app" })
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/auth/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }
}
