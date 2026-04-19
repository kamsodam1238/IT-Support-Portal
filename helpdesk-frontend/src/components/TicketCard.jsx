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
        // Card container
        <div>
            <h3>{title}</h3>
            <p>Status: {status}</p>
            <p>Department: {department}</p>
            <p>Submitted By: {submittedBy}</p>
            <p>Created At: {createdAt}</p>
            <p>Priority: {priority === "High" ? "High Urgency" : priority}</p>
            <p>Description: {description || "No description provided."}</p>

            {/* Action Button Section */}
            <div style={{ marginTop: "10px" }}>
                {/* View details page */}
                <Link to={`/tickets/${id}`} style={{ marginRight: "10px" }} >
                    View Details
                </Link>

                {canManageTickets && status === "Open" && (
                    <button
                        onClick={() => inProgress(id)}
                        style={{ marginRight: "10px", padding: "8px 12px" }}
                    >
                        Mark In Progress
                    </button>
                )}

                {canManageTickets && status !== "Closed" && (
                    <button
                        onClick={() => closeTicket(id)}
                        style={{ marginRight: "10px", padding: "8px 12px" }}
                    >
                        Mark Closed
                    </button>
                )}

                {canManageTickets && (
                    <button onClick={() => deleteTicket(id)}
                        style={{ marginRight: "10px", padding: "8px 12px" }}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default TicketCard;
{/**
      This line:

onClick={() => closeTicket(id)}

means:

wait until the button is clicked
then call closeTicket
pass this card’s id

Same idea here:

onClick={() => deleteTicket(id)}

This is very common in React.  
*/}