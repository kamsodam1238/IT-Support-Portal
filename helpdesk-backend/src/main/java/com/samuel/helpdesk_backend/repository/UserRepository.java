package com.samuel.helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.samuel.helpdesk_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByPermanentAccountFalse();
}
