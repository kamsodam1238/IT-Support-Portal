import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { updateTicketInBackend } from "../services/ticketService";

function EditTicketPage({ tickets, setTickets }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const isAdmin = currentUser && currentUser.role === "ADMIN";
    const ticket = tickets.find((ticket) => String(ticket.id) === String(id));

    const [title, setTitle] = useState(ticket ? ticket.title : "");
    const [status, setStatus] = useState(ticket ? ticket.status : "");
    const [priority, setPriority] = useState(ticket ? ticket.priority : "");
    const [department, setDepartment] = useState(ticket ? ticket.department : "");
    const [submittedBy, setSubmittedBy] = useState(ticket ? ticket.submittedBy : "");
    const [createdAt, setCreatedAt] = useState(ticket ? ticket.createdAt : "");
    const [description, setDescription] = useState(ticket ? ticket.description || "" : "");
    const [message, setMessage] = useState("");

    if (!ticket) {
        return (
            <div>
                <PageHeading text="Ticket Not Found" />
                <p>The ticket you are trying to edit does not exist.</p>
            </div>
        );
    }


    
    async function handleSubmit(event) {
        event.preventDefault();

        if (title === "") {
            setMessage("Title field is empty");
            return;
        }

        const updatedTicket = {
            title: title.trim(),
            status: status.trim(),
            priority: priority.trim(),
            department: department.trim(),
            submittedBy: submittedBy.trim(),
            createdAt: createdAt.trim(),
            description: description.trim()
        };

        try {
            const savedTicket = await updateTicketInBackend(id, updatedTicket);

            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    String(ticket.id) === String(id) ? savedTicket : ticket
                )
            );

            setMessage("Ticket updated successfully.");
            navigate(`/tickets/${id}`);
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <PageHeading text="Edit Ticket" />

            <form
                onSubmit={handleSubmit}
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "500px"
                }}
            >
                <div style={{ marginBottom: "12px" }}>
                    <label>Title</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Status</label>
                    <br />
                    <select
                        type="text"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Priority</label>
                    <br />
                    <select
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                        disabled={!isAdmin}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Department</label>
                    <br />
                    <select
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    >
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Submitted By</label>
                    <br />
                    <input
                        type="text"
                        value={submittedBy}
                        onChange={(event) => setSubmittedBy(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Created At</label>
                    <br />
                    <input
                        type="text"
                        value={createdAt}
                        onChange={(event) => setCreatedAt(event.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>Description</label>
                    <br />
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows="4"
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <Link to={`/tickets/${id}`} style={{ marginRight: "12px" }}>
                    Cancel
                </Link>

                <button type="submit" style={{ padding: "10px 16px" }}>
                    Save Changes
                </button>

                {message && <p style={{ marginTop: "12px" }}>{message}</p>}
            </form>
        </div>
    );
}

export default EditTicketPage;