import PageHeading from "../components/PageHeading";

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
        <div className="page-container">
            <PageHeading text="Dashboard" />

            {currentUser && (
                <div>
                    <p className="center-text" style={{ marginBottom: "20px" }}>
                        Welcome, <strong>{currentUser.name}</strong>. Role: {currentUser.role}
                    </p>
                    <div className="info-grid">
                        <div className="info-box">Total Tickets: {totalTickets}</div>
                        <div className="info-box">Open Tickets: {openTickets}</div>
                        <div className="info-box">In Progress Tickets: {inProgressTickets}</div>
                        <div className="info-box">Closed Tickets: {closedTickets}</div>
                        <div className="info-box">High Priority Tickets: {highPriorityTickets}</div>
                        <div className="info-box">Medium Priority Tickets: {mediumPriorityTickets}</div>
                        <div className="info-box">Low Priority Tickets: {lowPriorityTickets}</div>
                    </div>

                    <div className="action-row" style={{ marginTop: "24px", justifyContent: "center" }}>
                        <button className="button button-danger" onClick={clearAllTickets}>
                            Clear All Tickets
                        </button>

                        <button className="button button-secondary" onClick={resetToDefaults}>
                            Reset to Default Tickets
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;