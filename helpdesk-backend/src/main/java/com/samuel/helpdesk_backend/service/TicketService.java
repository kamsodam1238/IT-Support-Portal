package com.samuel.helpdesk_backend.service;

import com.samuel.helpdesk_backend.model.Ticket;
import com.samuel.helpdesk_backend.repository.TicketRepository;

import java.util.List;
import java.util.Map;

// Mark this class as a Spring service
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    // In-memory ticket storage for now
    // This list stays in memory while the backend is running
    private final TicketRepository ticketRepository;

    // Spring injects the repository here
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Return all tickets from PostgreSQL
    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }

    // Return one ticket by id
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    // Create a new ticket
    public Ticket createTicket(Ticket newTicket) {
        // Generate the next id
        // If createdAt was missing, set a fallback value
        if (newTicket.getCreatedAt() == null || newTicket.getCreatedAt().isBlank()) {
            newTicket.setCreatedAt("Created on backend");
        }

        if (newTicket.getDescription() == null) {
            newTicket.setDescription("");
        }

        return ticketRepository.save(newTicket);
    }

    // Delete a ticket by id
    public boolean deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            return false;
        }

        ticketRepository.deleteById(id);
        return true;
    }

    // Mark a ticket as closed
    public Ticket closeTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);

        if (ticket != null) {
            ticket.setStatus("Closed");
            return ticketRepository.save(ticket);
        }

        return null;
    }

    // Return dashboard summary from real DB data
    public Map<String, Integer> getDashboardSummary() {
        List<Ticket> tickets = ticketRepository.findAll();
        int totalTickets = tickets.size();

        int openTickets = (int) tickets.stream().filter(ticket -> ticket.getStatus().equals("Open")).count();

        int closedTickets = (int) tickets.stream().filter(ticket -> ticket.getStatus().equals("Closed")).count();

        int inProgressTickets = (int) tickets.stream().filter(ticket -> ticket.getStatus().equals("In Progress"))
                .count();

        int highPriorityTickets = (int) tickets.stream().filter(ticket -> ticket.getPriority().equals("High")).count();

        int mediumPriorityTickets = (int) tickets.stream().filter(ticket -> ticket.getPriority().equals("Medium"))
                .count();

        int lowPriorityTickets = (int) tickets.stream().filter(ticket -> ticket.getPriority().equals("Low")).count();

        return Map.of(
                "totalTickets", totalTickets,
                "openTickets", openTickets,
                "closedTickets", closedTickets,
                "inProgressTickets", inProgressTickets,
                "highPriorityTickets", highPriorityTickets,
                "mediumPriorityTickets", mediumPriorityTickets,
                "lowPriorityTickets", lowPriorityTickets);
    }

    // Return only open tickets from PostgreSQL
    public List<Ticket> getOpenTickets() {
        return ticketRepository.findByStatus("Open");
    }

    // Return only closed tickets from PostgreSQL
    public List<Ticket> getClosedTickets() {
        return ticketRepository.findByStatus("Closed");
    }

    // Return only high priority tickets
    public List<Ticket> getHighPriorityTickets() {
        return ticketRepository.findByPriority("High");
    }

    // Return only tickets from that department
    public List<Ticket> getTicketsByDepartment(String department) {
        return ticketRepository.findByDepartmentIgnoreCase(department);
        }

    // Return only tickets by Priority
    public List<Ticket> getTicketsByPriority(String priority) {
        return ticketRepository.findByPriorityIgnoreCase(priority);
        }

    // Return department options
    public List<String> getDepartments() {
        return List.of("IT", "HR", "Finance");
    }

    // Return priority options
    public List<String> getPriorities() {
        return List.of("High", "Medium", "Low");
    }

    // Return status options
    public List<String> getStatusOptions() {
        return List.of("Open", "In Progress", "Closed");
    }

    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket existingTicket = ticketRepository.findById(id).orElse(null);

        if (existingTicket == null) {
            return null;
        }

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());
        existingTicket.setDepartment(updatedTicket.getDepartment());
        existingTicket.setSubmittedBy(updatedTicket.getSubmittedBy());
        existingTicket.setCreatedAt(updatedTicket.getCreatedAt());
        existingTicket.setDescription(updatedTicket.getDescription());

        return ticketRepository.save(existingTicket);
    }

    public List<Ticket> getTicketsByUserId(Long userId) {
        return ticketRepository.findByUserId(userId);
    }
}
