export function countOpenTickets(tickets){
    return tickets.filter((ticket) => ticket.status === "Open").length;
}

export function countClosedTickets(tickets){
    return tickets.filter((ticket) => ticket.status === "Closed").length;
}

export function countInProgress(tickets){
    return tickets.filter(
        (ticket) => ticket.status === "In Progress").length;
}