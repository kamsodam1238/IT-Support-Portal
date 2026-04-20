import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicketInBackend } from "../services/ticketService";

function CreateTicketForm({ addTicket }) {
    // Input state
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [department, setDepartment] = useState("");
    const [submittedBy, setSubmittedBy] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // useNavigate lets us move the user to another page
    const navigate = useNavigate();

    function validateForm() {
        const newErrors = {};

        if (title.trim() === "") {
            newErrors.title = "Title is required.";
        }

        if (submittedBy.trim() === "") {
            newErrors.submittedBy = "Submitted By is required.";
        }

        if (status.trim() === "") {
            newErrors.status = "Status is required.";
        }

        if (priority.trim() === "") {
            newErrors.priority = "Priority is required.";
        }

        if (department.trim() === "") {
            newErrors.department = "Department is required.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        // prevent page refresh
        event.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);
        setMessage("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Create a new ticket object
        const newTicket = {
            title: cleanedTitle,
            status: cleanedStatus,
            priority: cleanedPriority,
            department: cleanedDepartment,
            submittedBy: cleanedSubmittedBY,
            createdAt: new Date().toLocaleDateString(),
            description: cleanedDescription
        };

        setIsSaving(true);

        try {
            // Send the ticket to the backend
            const createdTicket = await createTicketInBackend(newTicket);

            // Add the ticket returned by backend into frontend state
            addTicket(createdTicket);

            // Show success message
            setMessage("Ticket created successfully in backend.");

            // Clear the form fields
            setTitle("");
            setStatus("");
            setPriority("");
            setDepartment("");
            setSubmittedBy("");
            setDescription("")

            // Redirect the user to the tickets page
            navigate("/tickets")
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                maxWidth: "500px"
            }}
        >
            <h2>Create Ticket</h2>

            {/* Ticket title input */}
            <div style={{ marginBottom: "12px" }}>
                <label>Title</label>
                <br />
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter ticket title"
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                />
                {errors.title && (
                    <p style={{ color: "red", marginTop: "4px" }}>{errors.title}</p>
                )}
            </div>

            {/* Ticket status dropdown */}
            <div style={{ marginBottom: "12px" }}>
                <label>Status</label>
                <br />
                <select
                    type="text"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                >
                    <option value="">Select status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                {errors.status && (
                    <p style={{ color: "red", marginTop: "4px" }}>{errors.status}</p>
                )}
            </div>

            {/* Ticket Priority input */}
            <div style={{ marginBottom: "12px" }}>
                <label>Priority</label>
                <br />
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && (
                    <p style={{ color: "red", marginTop: "4px" }}>{errors.priority}</p>
                )}
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label>Department</label>
                <br />
                <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                >
                    <option value="">Select department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
                {errors.department && (
                    <p style={{ color: "red", marginTop: "4px" }}>{errors.department}</p>
                )}
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label>Submitted By</label>
                <br />
                <input
                    type="text"
                    value={submittedBy}
                    onChange={(event) => setSubmittedBy(event.target.value)}
                    placeholder="Enter submitter name"
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                />
                {errors.submittedBy && (
                    <p style={{ color: "red", marginTop: "4px" }}>{errors.submittedBy}</p>
                )}
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label>Description</label>
                <br />
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe the issue"
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={isSaving}
                style={{ padding: "10px 16px" }}
            >
                {isSaving ? "Saving..." : "Add Ticket"}
            </button>


            {/* Show feedback message if it exists */}
            {message && <p style={{ marginTop: "12px" }}>{message}</p>}
        </form>
    );
}

export default CreateTicketForm;