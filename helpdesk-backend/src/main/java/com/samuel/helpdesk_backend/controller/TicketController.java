package com.samuel.helpdesk_backend.controller;

import com.samuel.helpdesk_backend.model.Ticket;
import com.samuel.helpdesk_backend.service.TicketService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Used for returning a list of tickets
import java.util.List;

// Used for returning dashboard summary data
import java.util.Map;

// This controller handles ticket-related endpoints
@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://it-support-portal-frontend.vercel.app" })
public class TicketController {
    // Store a reference to the service layer
    private final TicketService ticketService;

    // Constructor injection:
    // Spring automatically gives this controller a TicketService object
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Endpoint: GET /api/tickets
    @GetMapping("/api/tickets")
    public List<Ticket> getTickets() {
        return ticketService.getTickets();
    }

    @GetMapping("/api/tickets/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping("/api/tickets")
    public Ticket createTicket(@Valid @RequestBody Ticket newTicket) {
        return ticketService.createTicket(newTicket);
    }

    // Delete /api/tickets/{id}
    @DeleteMapping("/api/tickets/{id}")
    public boolean deleteTicket(@PathVariable Long id) {
        return ticketService.deleteTicket(id);
    }

    // PATCH /api/tickets/{id}/close
    @PatchMapping("/api/tickets/{id}/close")
    public Ticket closeTicket(@PathVariable Long id) {
        return ticketService.closeTicket(id);
    }

    @GetMapping("/api/tickets/open")
    public List<Ticket> getOpenTickets() {
        return ticketService.getOpenTickets();
    }

    @GetMapping("/api/tickets/closed")
    public List<Ticket> getClosedTickets() {
        return ticketService.getClosedTickets();
    }

    @GetMapping("/api/tickets/high-priority")
    public List<Ticket> getHighPriorityTickets() {
        return ticketService.getHighPriorityTickets();
    }

    @GetMapping("/api/dashboard-summary")
    public Map<String, Integer> getDashboardSummary() {
        return ticketService.getDashboardSummary();
    }

    @GetMapping("/api/tickets/department/{department}")
    public List<Ticket> getTicketsByDepartment(@PathVariable String department) {
        return ticketService.getTicketsByDepartment(department);
    }

    @GetMapping("/api/tickets/priority/{priority}")
    public List<Ticket> getTicketsByPriority(@PathVariable String priority) {
        return ticketService.getTicketsByPriority(priority);
    }

    @GetMapping("/api/departments")
    public List<String> getDepartments() {
        return ticketService.getDepartments();
    }

    @GetMapping("/api/priorities")
    public List<String> getPriorities() {
        return ticketService.getPriorities();
    }

    @GetMapping("/api/status-options")
    public List<String> getStatusOptions() {
        return ticketService.getStatusOptions();
    }

    @PutMapping("/api/tickets/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        return ticketService.updateTicket(id, updatedTicket);
    }

    @GetMapping("/api/users/{userId}/tickets")
    public List<Ticket> getTicketsByUserId(@PathVariable Long userId) {
        return ticketService.getTicketsByUserId(userId);
    }
}

