package com.samuel.helpdesk_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

// This annotation tells Spring Boot:
// "This is the main app class. Start everything from here."
@SpringBootApplication
@EnableScheduling
public class HelpdeskBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelpdeskBackendApplication.class, args);
	}

}
