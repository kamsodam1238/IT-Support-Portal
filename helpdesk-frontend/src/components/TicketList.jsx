import TicketCard from "./TicketCard";

function TicketList({ 
    tickets, 
    deleteTicket,
    closeTicket,
    inProgress,
    currentUser
 }){
    
    // If there are no tickets, show message
    if (tickets.length === 0){
        return(
            <div>
                <h2>All Tickets</h2>
                <p>No tickets found.</p>
            </div>
        );
    }
    
    
    // Keep only tickets that are open
    return (
        
        <div>
            <h2>All Tickets</h2>
            
            {/* .map() loops through every ticket in the tickets array
                and returns one TicketCard component for each ticket */}
            {tickets.map((ticket) =>(
                <TicketCard 
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    status={ticket.status}
                    priority={ticket.priority}
                    department={ticket.department}
                    submittedBy={ticket.submittedBy}
                    createdAt={ticket.createdAt}
                    description={ticket.description}
                    deleteTicket={deleteTicket}
                    closeTicket={closeTicket}
                    inProgress={inProgress}
                    currentUser={currentUser}
                    />
            ))}
        </div>
    );
}

export default TicketList;
/*
Why key is important
Inside .map(), React wants each item to have a unique key.

Example:

key={ticket.id}
This helps React track each item properly.

Use something unique like:

database id

ticket id

Do not usually use the array index unless you have no better option.
*/