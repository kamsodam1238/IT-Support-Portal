import { Link } from "react-router-dom";

function TicketCard({
    id,
    title,
    status,
    priority,
    department,
    submittedBy,
    createdAt,
    description,
    deleteTicket,
    closeTicket,
    inProgress,
    currentUser
}) {
    const canManageTickets =
        currentUser &&
        (currentUser.role === "ADMIN" || currentUser.role === "AGENT");

    return (
        <div className="card">
            <h3>{title}</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Department:</strong> {department}</p>
            <p><strong>Submitted By:</strong> {submittedBy}</p>
            <p><strong>Created At:</strong> {createdAt}</p>
            <p><strong>Priority:</strong> {priority === "High" ? "High Urgency" : priority}</p>
            <p><strong>Description:</strong> {description || "No description provided."}</p>

            <div className="action-row">
                <Link to={`/tickets/${id}`}>View Details</Link>

                {canManageTickets && (
                    <Link to={`/tickets/${id}/edit`}>Edit</Link>
                )}

                {canManageTickets && status === "Open" && (
                    <button
                        className="button"
                        onClick={() => inProgress(id)}
                    >
                        Mark In Progress
                    </button>
                )}

                {canManageTickets && status !== "Closed" && (
                    <button
                        className="button button-secondary"
                        onClick={() => closeTicket(id)}
                    >
                        Mark Closed
                    </button>
                )}

                {canManageTickets && (
                    <button
                        className="button button-danger"
                        onClick={() => deleteTicket(id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default TicketCard;