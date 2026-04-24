package com.samuel.helpdesk_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Ticket {
    // Primary key
    @Id
    // Fields (properties) of a ticket
    // Database auto-genrates the id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required.")
    private String title;

    @NotBlank(message = "Status is required.")
    private String status;

    @NotBlank(message = "Priority is required.")
    private String priority;

    @NotBlank(message = "Department is required.")
    private String department;

    @NotBlank(message = "Submitted By is required")
    private String submittedBy;

    private String createdAt;
    private String description;
    private Long userId;

    
    // Constructors
    public Ticket() {
        
    }
    
    public Ticket(Long id, String title, String status, String priority, String department, String submittedBy,
        String createdAt, String description, Long userId) {
            this.id = id;
            this.title = title;
            this.status = status;
            this.priority = priority;
            this.department = department;
            this.submittedBy = submittedBy;
            this.createdAt = createdAt;
            this.description = description;
            this.userId = userId;
        }
        
        // Getter and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
        
        public String getTitle() {
            return title;
        }
        
        public void setTitle(String title) {
            this.title = title;
        }
        
        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
        
        public String getPriority() {
            return priority;
        }
        
        public void setPriority(String priority) {
            this.priority = priority;
        }
        
        public String getDepartment() {
            return department;
        }
        
        public void setDepartment(String department) {
            this.department = department;
        }
        
        public String getSubmittedBy() {
            return submittedBy;
        }
        
        public void setSubmittedBy(String submittedBy) {
            this.submittedBy = submittedBy;
        }
        
        public String getCreatedAt() {
            return createdAt;
        }
        
        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }
        public String getDescription() {
            return description;
        }
    
        public void setDescription(String description) {
            this.description = description;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
    