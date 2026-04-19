package com.samuel.helpdesk_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.samuel.helpdesk_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
