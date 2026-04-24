import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { signupUser } from "../services/authService";

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    function validateForm() {
        const newErrors = {};

        if (name.trim() === "") {
            newErrors.name = "Name is required.";
        }

        if (email.trim() === "") {
            newErrors.email = "Email is required.";
        }

        if (password.trim() === "") {
            newErrors.password = "Password is required.";
        }

        if (confirmPassword.trim() === "") {
            newErrors.confirmPassword = "Please confirm your password.";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
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

        setIsSaving(true);

        try {
            const result = await signupUser({
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            });

            if (result.success) {
                setMessage("Account created successfully. Redirecting to login...");
                setTimeout(() => navigate("/login"), 1200);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-card">
                <PageHeading text="Sign Up" />

                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        className="form-input"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <p className="error-text">{errors.confirmPassword}</p>
                    )}
                </div>

                <div className="action-row">
                    <button className="button" type="submit" disabled={isSaving}>
                        {isSaving ? "Creating..." : "Create Account"}
                    </button>

                    <Link to="/login">Back to Login</Link>
                </div>

                <p className="message">
                    Demo note: non-permanent accounts may be deleted automatically after 15 days.
                </p>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default SignupPage;