import { useParams, Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";

function TicketDetailsPage({ tickets }) {
    // Get the id value from the URL
    const { id } = useParams();

    
    // Find the matching tickets in the tickets array
    // Number(id) converts the URL string into a number
    const ticket = tickets.find((ticket) => String(ticket.id) === String(id));

    // If no matching tickets is found, show an error message
    if (!ticket) {
        return (
            <div>
                <PageHeading text="Ticket Not Found" />
                <p>The ticket you are looking for does not exist</p>
                <Link to="/tickets" >Back to Tickets</Link>
                <Link to="/tickets" style={{ marginRight: "12px" }}>
                    Back to Tickets
                </Link>
                <Link to="/">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div>
            <PageHeading text="Ticket Details" />

            {/* Show all ticket information */}
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Title:</strong> {ticket.title}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Department</strong> {ticket.department}</p>
            <p><strong>Submitted By:</strong> {ticket.submittedBy}</p>
            <p><strong>Created At:</strong> {ticket.createdAt}</p>
            <p><strong>Description:</strong> {ticket.description || "No description provided."}</p>


            {/* High priority warning */}
            {ticket.priority === "High" && (<p>
                This ticket requires urgent attention
            </p>)}

            {/* Closed status message */}
            {ticket.status === "Closed" && (<p>
                This ticket has been resolved.
            </p>)} <br />

            {/* Link back to ticket list */}
            <Link to="/tickets" style={{ marginRight: "10px" }} >Back to Tickets</Link>
            <Link to="/" >Back to Dashboard</Link>
        </div>
    );
}

export default TicketDetailsPage;
/*
How tickets.find() works

This line is important:

const ticket = tickets.find((ticket) => ticket.id === Number(id));

It means:

search through the tickets array
return the first ticket whose id matches the URL id

Example:

URL is / tickets / 2
id from useParams() is "2"
Number(id) becomes 2
    .find() returns the ticket with id 2
8. Why Number(id) is needed

useParams() gives values as strings.

    So:

id === "2"

But your ticket ids are numbers:

ticket.id === 2

So this would fail without conversion.

That is why we use:

Number(id)

*/