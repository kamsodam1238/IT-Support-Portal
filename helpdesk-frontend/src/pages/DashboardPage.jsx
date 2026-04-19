import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import { fetchDashboardSummaryFromBackend } from "../services/ticketService";

function DashboardPage({
    tickets,
    clearAllTickets,
    resetToDefaults,
    currentUser
}) {
    const totalTickets = tickets.length;

    const openTickets = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const closedTickets = tickets.filter(
        (ticket) => ticket.status === "Closed"
    ).length;

    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;

    const highPriorityTickets = tickets.filter(
        (ticket) => ticket.priority === "High"
    ).length;

    const mediumPriorityTickets = tickets.filter(
        (ticket) => ticket.priority === "Medium"
    ).length;

    const lowPriorityTickets = tickets.filter(
        (ticket) => ticket.priority === "Low"
    ).length;


    return (
        <div>
            <PageHeading text={"Dashboard"} />

            {currentUser && (
                <p>
                    Welcome, <strong>{currentUser.name}</strong>. Role: {currentUser.role}
                </p>
            )}

            <p>Total Tickets: {totalTickets}</p>
            <p>Open Tickets: {openTickets}</p>
            <p>In Progress Tickets: {inProgressTickets}</p>
            <p>Closed Tickets: {closedTickets}</p>
            <p>High Priority Tickets: {highPriorityTickets}</p>
            <p>Medium Priority Tickets: {mediumPriorityTickets}</p>
            <p>Low Priority Tickets: {lowPriorityTickets}</p>


            {/* Dashboard action buttons */}
            <div style={{ marginTop: "16px" }}>
                <button
                    onClick={clearAllTickets}
                    style={{ marginRight: "10px", padding: "8px 12px" }}
                >
                    Clear All Tickets
                </button>

                <button
                    onClick={resetToDefaults}
                    style={{ padding: "8px 12px" }}
                >
                    Reset to Default Tickets
                </button>
            </div>
        </div>

    );
}

export default DashboardPage;