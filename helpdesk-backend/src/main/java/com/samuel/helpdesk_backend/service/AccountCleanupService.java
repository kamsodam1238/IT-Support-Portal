package com.samuel.helpdesk_backend.service;

import com.samuel.helpdesk_backend.model.User;
import com.samuel.helpdesk_backend.repository.TicketRepository;
import com.samuel.helpdesk_backend.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountCleanupService {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    public AccountCleanupService(UserRepository userRepository, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }

    // Runs once every day
    @Scheduled(cron = "0 0 2 * * *")
    public void deleteExpiredNonPermanentAccounts() {
        List<User> temporaryUsers = userRepository.findByPermanentAccountFalse();
        LocalDateTime now = LocalDateTime.now();

        for (User user : temporaryUsers) {
            if (user.getCreatedAt() == null || user.getCreatedAt().isBlank()) {
                continue;
            }

            LocalDateTime createdAt = LocalDateTime.parse(user.getCreatedAt());

            if (createdAt.plusDays(15).isBefore(now)) {
                ticketRepository.deleteByUserId(user.getId());
                userRepository.delete(user);

                System.out.println("Deleted expired account: " + user.getEmail());
            }
        }
    }
}