import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicketInBackend } from "../services/ticketService";

function CreateTicketForm({ addTicket, currrentUser }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [department, setDepartment] = useState("");
    const [submittedBy, setSubmittedBy] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

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
        event.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);
        setMessage("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const cleanedTitle = title.trim();
        const cleanedStatus = status.trim();
        const cleanedPriority = priority.trim();
        const cleanedDepartment = department.trim();
        const cleanedSubmittedBy = submittedBy.trim();
        const cleanedDescription = description.trim();

        const newTicket = {
            title: cleanedTitle,
            status: cleanedStatus,
            priority: cleanedPriority,
            department: cleanedDepartment,
            submittedBy: cleanedSubmittedBy,
            createdAt: new Date().toLocaleString(),
            description: cleanedDescription,
            userId: currrentUser.userId
        };

        setIsSaving(true);

        try {
            const createdTicket = await createTicketInBackend(newTicket);
            addTicket(createdTicket);

            setMessage("Ticket created successfully in backend.");

            setTitle("");
            setStatus("");
            setPriority("");
            setDepartment("");
            setSubmittedBy("");
            setDescription("");
            setErrors({});

            navigate("/tickets");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-card">
                <h2 className="page-title center-text">Create Ticket</h2>

                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        className="form-input"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter ticket title"
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
                        <option value="">Select status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                    {errors.status && <p className="error-text">{errors.status}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                        className="form-select"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                    >
                        <option value="">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.priority && <p className="error-text">{errors.priority}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                        className="form-select"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    >
                        <option value="">Select department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                    {errors.department && <p className="error-text">{errors.department}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Submitted By</label>
                    <input
                        className="form-input"
                        type="text"
                        value={submittedBy}
                        onChange={(event) => setSubmittedBy(event.target.value)}
                        placeholder="Enter submitter name"
                    />
                    {errors.submittedBy && (
                        <p className="error-text">{errors.submittedBy}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe the issue"
                        rows="4"
                    />
                </div>

                <button className="button" type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Add Ticket"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default CreateTicketForm;