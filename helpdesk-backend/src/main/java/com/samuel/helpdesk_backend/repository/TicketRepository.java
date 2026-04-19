package com.samuel.helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.samuel.helpdesk_backend.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(String status);
    List<Ticket> findByPriority(String priority);
    List<Ticket> findByDepartmentIgnoreCase(String department);
    List<Ticket> findByPriorityIgnoreCase(String priority);
}
