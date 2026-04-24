import CreateTicketForm from "../components/CreateTicketForm";
import PageHeading from "../components/PageHeading";

function CreateTicketPage({ addTicket, currrentUser }) {
    return (
        <div>
            {/* Reuse the create-ticket form */}
            <CreateTicketForm addTicket={addTicket} currrentUser={currrentUser} />
        </div>
    );
}

export default CreateTicketPage;
