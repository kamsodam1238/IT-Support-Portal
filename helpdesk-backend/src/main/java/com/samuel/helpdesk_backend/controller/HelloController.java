package com.samuel.helpdesk_backend.controller;

// Used to map HTTP GET requests to methods
import org.springframework.web.bind.annotation.GetMapping;

// Used to map HTTP GET requests to methods
import org.springframework.web.bind.annotation.RestController;

// Tells Spring that this class returns API responses
@RestController
public class HelloController {

    // When the browser visits the url, the methods run
    @GetMapping("/api/hello")
    public String sayHello() {
        return "Welcome to the IT Support Portal backend.";
    }
    
    @GetMapping ("/api/status") 
    public String status() {
        return "Backend is running successfully";
    }

    @GetMapping("/api/version") 
    public String version() {
        return "v1";
    }
}
