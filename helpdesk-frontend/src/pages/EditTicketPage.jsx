import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { updateTicketInBackend } from "../services/ticketService";

function EditTicketPage({ tickets, setTickets, currentUser }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const isAdmin = currentUser && currentUser.role === "ADMIN";
    const ticket = tickets.find((ticket) => String(ticket.id) === String(id));

    const [title, setTitle] = useState(ticket ? ticket.title : "");
    const [status, setStatus] = useState(ticket ? ticket.status : "Open");
    const [priority, setPriority] = useState(ticket ? ticket.priority : "Low");
    const [department, setDepartment] = useState(ticket ? ticket.department : "IT");
    const [submittedBy, setSubmittedBy] = useState(ticket ? ticket.submittedBy : "");
    const [createdAt, setCreatedAt] = useState(ticket ? ticket.createdAt : "");
    const [description, setDescription] = useState(ticket ? ticket.description || "" : "");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    if (!ticket) {
        return (
            <div className="page-container">
                <PageHeading text="Ticket Not Found" />
                <p>The ticket you are trying to edit does not exist.</p>
                <Link to="/tickets">Back to Tickets</Link>
            </div>
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (title.trim() === "") {
            newErrors.title = "Title is required.";
        }

        if (submittedBy.trim() === "") {
            newErrors.submittedBy = "Submitted By is required.";
        }

        setErrors(newErrors);
        setMessage("");

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const updatedTicket = {
            title: title.trim(),
            status,
            priority,
            department,
            submittedBy: submittedBy.trim(),
            createdAt: createdAt.trim(),
            description: description.trim()
        };

        setIsSaving(true);

        try {
            const savedTicket = await updateTicketInBackend(id, updatedTicket);

            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    String(ticket.id) === String(id) ? savedTicket : ticket
                )
            );

            navigate(`/tickets/${id}`);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-card">
                <PageHeading text="Edit Ticket" />

                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        className="form-input"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                        className="form-select"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                        disabled={!isAdmin}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                        className="form-select"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    >
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Submitted By</label>
                    <input
                        className="form-input"
                        type="text"
                        value={submittedBy}
                        onChange={(event) => setSubmittedBy(event.target.value)}
                    />
                    {errors.submittedBy && (
                        <p className="error-text">{errors.submittedBy}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Created At</label>
                    <input
                        className="form-input"
                        type="text"
                        value={createdAt}
                        onChange={(event) => setCreatedAt(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows="4"
                    />
                </div>

                <div className="action-row">
                    <Link to={`/tickets/${id}`}>Cancel</Link>

                    <button className="button" type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default EditTicketPage;