package com.samuel.helpdesk_backend.config;

import com.samuel.helpdesk_backend.model.Ticket;
import com.samuel.helpdesk_backend.model.User;
import com.samuel.helpdesk_backend.repository.TicketRepository;
import com.samuel.helpdesk_backend.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// This class holds startup configuration logic
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(
            TicketRepository ticketRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Only insert starter data if the table is empty
            if (ticketRepository.count() == 0) {
                ticketRepository.save(new Ticket(
                        null,
                        "Printer not working",
                        "Open",
                        "High",
                        "IT",
                        "Samuel Kareem",
                        "4/1/2026, 9:00:00 AM",
                        "The office printer is not responding to print jobs.",
                        1L
                    ));
            }

            if (userRepository.count() == 0) {
                userRepository.save(new User(
                        null,
                        "Samuel Kareem",
                        "samuel@example.com",
                        passwordEncoder.encode("password123"),
                        "ADMIN",
                        java.time.LocalDateTime.now().toString(),
                        true));

                userRepository.save(new User(
                        null,
                        "IT Agent",
                        "agent@example.com",
                        passwordEncoder.encode("password1238"),
                        "AGENT",
                        java.time.LocalDateTime.now().toString(),
                        false));

                userRepository.save(new User(
                        null,
                        "Employee User",
                        "employee@example.com",
                        passwordEncoder.encode("password1234"),
                        "EMPLOYEE",
                        java.time.LocalDateTime.now().toString(),
                        false));
            }
        };
    }
}
