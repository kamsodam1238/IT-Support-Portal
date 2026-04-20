import { useState } from "react";
import TicketList from "../components/TicketList";
import PageHeading from "../components/PageHeading";
import {
    fetchHighPriorityTicketsFromBackend,
    fetchOpenTicketsFromBackend
} from "../services/ticketService";

function TicketsPage({
    tickets,
    deleteTicket,
    closeTicket,
    inProgress,
    currentUser,
    clearAllTickets,
    resetToDefaults
}) {
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [sortOption, setSortOption] = useState("Newest");

    const [backendViewTickets, setBackendViewTickets] = useState(null);
    const [backendLoading, setBackendLoading] = useState(false);
    const [backendError, setBackendError] = useState("");

    let workingTickets = backendViewTickets || tickets;
    let filteredTickets = [...workingTickets];

    filteredTickets = filteredTickets.filter(
        (ticket) =>
            ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
            ticket.submittedBy.toLowerCase().includes(searchText.toLowerCase())
    );

    if (statusFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.status === statusFilter
        );
    }

    if (priorityFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.priority === priorityFilter
        );
    }

    if (departmentFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.department === departmentFilter
        );
    }

    if (sortOption === "Newest") {
        filteredTickets.sort((a, b) => b.id - a.id);
    }

    if (sortOption === "Oldest") {
        filteredTickets.sort((a, b) => a.id - b.id);
    }

    if (sortOption === "Title A-Z") {
        filteredTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "Title Z-A") {
        filteredTickets.sort((a, b) => b.title.localeCompare(a.title));
    }

    function clearButton() {
        setSearchText("");
        setStatusFilter("All");
        setPriorityFilter("All");
        setDepartmentFilter("All");
        setSortOption("Newest");
        setBackendViewTickets(null);
        setBackendError("");
    }

    async function loadOpenTicketsFromBackend() {
        try {
            setBackendLoading(true);
            setBackendError("");
            const data = await fetchOpenTicketsFromBackend();
            setBackendViewTickets(data);
        } catch (error) {
            setBackendError(error.message);
        } finally {
            setBackendLoading(false);
        }
    }

    async function loadHighPriorityTicketsFromBackend() {
        try {
            setBackendLoading(true);
            setBackendError("");
            const data = await fetchHighPriorityTicketsFromBackend();
            setBackendViewTickets(data);
        } catch (error) {
            setBackendError(error.message);
        } finally {
            setBackendLoading(false);
        }
    }

    return (
        <div className="page-container">
            <PageHeading text="Tickets Page" />

            <div className="card" style={{ maxWidth: "700px", margin: "0 auto 24px" }}>
                <h3 style={{ marginTop: 0 }}>Search and Filter Tickets</h3>

                <div className="form-group">
                    <label className="form-label">Search by Title or Submitter</label>
                    <input
                        className="form-input"
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Search ticket title or submitter"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Status Filter</label>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Priority Filter</label>
                    <select
                        className="form-select"
                        value={priorityFilter}
                        onChange={(event) => setPriorityFilter(event.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Department Filter</label>
                    <select
                        className="form-select"
                        value={departmentFilter}
                        onChange={(event) => setDepartmentFilter(event.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Sort By</label>
                    <select
                        className="form-select"
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                    >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Title A-Z">Title A-Z</option>
                        <option value="Title Z-A">Title Z-A</option>
                    </select>
                </div>

                <div className="action-row">
                    <button className="button button-secondary" onClick={clearButton}>
                        Clear
                    </button>

                    <button className="button button-danger" onClick={clearAllTickets}>
                        Clear All Tickets
                    </button>

                    <button className="button" onClick={loadOpenTicketsFromBackend}>
                        Load Open Tickets
                    </button>

                    <button className="button" onClick={loadHighPriorityTicketsFromBackend}>
                        Load High Priority Tickets
                    </button>

                    <button className="button button-secondary" onClick={resetToDefaults}>
                        Reset To Default Tickets
                    </button>
                </div>

                {backendLoading && (
                    <p className="message">Loading tickets from backend...</p>
                )}

                {backendError && (
                    <p className="error-text">{backendError}</p>
                )}

                <p className="message">Matching Tickets: {filteredTickets.length}</p>
            </div>

            <TicketList
                tickets={filteredTickets}
                deleteTicket={deleteTicket}
                closeTicket={closeTicket}
                inProgress={inProgress}
                currentUser={currentUser}
            />
        </div>
    );
}

export default TicketsPage;