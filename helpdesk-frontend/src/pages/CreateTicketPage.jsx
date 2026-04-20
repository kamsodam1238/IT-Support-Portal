import CreateTicketForm from "../components/CreateTicketForm";
import PageHeading from "../components/PageHeading";

function CreateTicketPage({ addTicket }) {
    return (
        <div>
            {/* Reuse the create-ticket form */}
            <CreateTicketForm addTicket={addTicket} />
        </div>
    );
}

export default CreateTicketPage;
