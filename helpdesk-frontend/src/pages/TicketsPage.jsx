import { useState } from "react";
import TicketList from "../components/TicketList";
import PageHeading from "../components/PageHeading";
import { fetchHighPriorityTicketsFromBackend, fetchOpenTicketsFromBackend } from "../services/ticketService";

function TicketsPage({
    tickets,
    deleteTicket,
    closeTicket,
    inProgress,
    currentUser,
    clearAllTickets,
    resetToDefaults
}) {
    // Search text typed by the user
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [sortOption, setSortOption] = useState("Newest");

    // Temporary backend-loaded ticket view
    const [backendViewTickets, setBackendViewTickets] = useState(null);
    const [backendLoading, setBackendLoading] = useState(false);
    const [backendError, setBackendError] = useState("");

    // Use backend view if active, otherwise use app tickets
    let workingTickets = backendViewTickets || tickets;

    // Start with a copy of tickets so we can filter and sort it
    let filteredTickets = [...workingTickets];

    // Filter by title and submitter search
    filteredTickets = filteredTickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchText.toLowerCase()) || ticket.submittedBy.toLowerCase().includes(searchText.toLowerCase())
    );

    // Filter by status if the user selected something other than All
    if (statusFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.status === statusFilter
        );
    }

    // Filter by priority if needed
    if (priorityFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.priority === priorityFilter
        );
    }

    // Filter by department if needed
    if (departmentFilter !== "All") {
        filteredTickets = filteredTickets.filter(
            (ticket) => ticket.department === departmentFilter
        );
    }

    // Sort the filtered list
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
        <div>
            <PageHeading text={"Tickets Page"} />

            {/* Search and filter section */}
            <div
                style={{
                    border: "1px solid white",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    maxWidth: "700px"
                }}
            >
                <h3>Search and Filter Tickets</h3>

                {/* Search box */}
                <div style={{ marginBottom: "12px" }}>
                    <label>Search by Title or Submitter</label>
                    <br />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Search ticket title"
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                {/* Status filter */}
                <div style={{ marginBottom: "12px" }}>
                    <label>Status Filter</label>
                    <br />
                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* Priority filter */}
                <div style={{ marginBottom: "12px" }}>
                    <label>Priority Filter</label>
                    <br />
                    <select
                        value={priorityFilter}
                        onChange={(event) => setPriorityFilter(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Department filter */}
                <div style={{ marginBottom: "12px" }}>
                    <label>Department Filter</label>
                    <br />
                    <select
                        value={departmentFilter}
                        onChange={(event) => setDepartmentFilter(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="All">All</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                {/* Sort option */}
                <div style={{ marginBottom: "12px" }}>
                    <label>Sort By</label>
                    <br />
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Title A-Z">Title A-Z</option>
                        <option value="Title Z-A">Title Z-A</option>
                    </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <button
                        onClick={clearButton}
                        style={{ padding: "10px 16px" }}>
                        Clear
                    </button>
                </div>

                {/* Clear all tickets */}
                <div style={{ marginBottom: "12px" }}>
                    <button
                        onClick={clearAllTickets}
                        style={{ padding: "10px 16px" }}>
                        Clear All Tickets
                    </button>
                </div>

                {/* Load open tickets button */}
                <div style={{ marginBottom: "12px" }}>
                    <button
                        onClick={loadOpenTicketsFromBackend}
                        style={{ padding: "10px 16px" }}
                    >
                        Load Open Tickets
                    </button>
                </div>

                {/* Load High priority tickets button */}
                <div style={{ marginBottom: "12px" }}>
                    <button
                        onClick={loadHighPriorityTicketsFromBackend}
                        style={{ padding: "10px 16px" }}
                    >
                        Load High Priority Tickets
                    </button>
                </div>

                {/* Reset all tickets to default */}
                <div style={{ marginBottom: "12px" }}>
                    <button
                        onClick={resetToDefaults}
                        style={{ padding: "10px 16px" }}
                    >
                        Reset To Default Tickets
                    </button>
                </div>

                {backendLoading &&
                    <p style={{ marginBottom: "12px" }}>
                        {backendError}
                    </p>
                }
                {backendError &&
                    <p style={{ marginBottom: "12px" }}>
                        Loading tickets from backend...
                    </p>
                }
                

                {/* Show how many tickets match */}
                <p>Matching Tickets: {filteredTickets.length}</p>
            </div>

            {/* Reuse the TicketList and pass needed props */}
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

{/**
This file manages the UI filters
Why we copied the array first
This line matters:
let filteredTickets = [...tickets];

We do this because:
sort() changes the array in place
we do not want to directly mutate the original tickets prop

So we make a copy first.
That is safer and more React-friendly.
*/}