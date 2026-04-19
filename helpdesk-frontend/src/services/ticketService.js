import defaultTickets from "../data/defaultTickets";
import API_BASE_URL from "./api";

const STORAGE_KEY = "tickets";

// -------------
// Local storage helpers
// -------------

// Get all tickets from localStorage
// If none are saved yet, return the default tickets
export function getTickets() {
    const savedTickets = localStorage.getItem(STORAGE_KEY);

    if (savedTickets) {
        return JSON.parse(savedTickets);
    }

    return defaultTickets;
}

// Save the full tickets array into localStorage
export function saveTickets(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

// Reset tickets back to the original defaults
export function resetTickets() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
    return defaultTickets;
}

// Remove all tickets
export function clearTickets() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
}

// -------------
// Backend API helpers
// -------------

// Fetch all tickets from the backend
export async function fetchTicketsFromBackend() {
    const response = await fetch(`${API_BASE_URL}/tickets`);

    if (!response.ok) {
        throw new Error(`Failed to fetch tickets from backend: ${errorText}`);
    }

    return await response.json();
}

// Fetch dashboard summary from the backend
export async function fetchDashboardSummaryFromBackend() {
    const response = await fetch(`${API_BASE_URL}/dashboard-summary`);

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard summary from backend.")
    }

    return await response.json();
}

export async function fetchOpenTicketsFromBackend() {
    const response = await fetch(`${API_BASE_URL}/tickets/open`);

    if (!response.ok) {
        throw new Error("Failed to fetch open tickets from backend.")
    }

    return await response.json();
}

export async function fetchHighPriorityTicketsFromBackend() {
    const response = await fetch(`${API_BASE_URL}/tickets/high-priority`);

    if (!response.ok) {
        throw new Error("Failed to fetch high priority tickets from backend")
    }

    return await response.json();
}

// Create a ticket through the backend
export async function createTicketInBackend(newTicket) {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTicket)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
}

// Delete a ticket through backend
export async function deleteTicketInBackend(ticketId) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error("Failed to delete ticket in backend");
    }

    return await response.json();
}

// Mark a ticket closed through backend
export async function closeTicketInBackend(ticketId) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/close`, {
        method: "PATCH"
    });

    if (!response.ok) {
        throw new Error("Failed to close ticket in backend");
    }

    return await response.json();
}

