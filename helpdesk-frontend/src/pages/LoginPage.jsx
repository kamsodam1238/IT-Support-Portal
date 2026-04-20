import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { loginUser } from "../services/authService";

function LoginPage({ setCurrentUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    if (localStorage.getItem("currentUser")) {
        return <Navigate to="/" replace />;
    }

    function validateForm() {
        const newErrors = {};

        if (email.trim() === "") {
            newErrors.email = "Email is required.";
        }

        if (password.trim() === "") {
            newErrors.password = "Password is required.";
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

        const cleanedEmail = email.trim();
        const cleanedPassword = password.trim();

        setIsSaving(true);

        try {
            const result = await loginUser({
                email: cleanedEmail,
                password: cleanedPassword
            });

            if (result.success) {
                localStorage.setItem("currentUser", JSON.stringify(result));
                setCurrentUser(result);
                setMessage("Login successful.");
                navigate("/");
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
                <PageHeading text="Login" />

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

                <button className="button" type="submit" disabled={isSaving}>
                    {isSaving ? "Logging in..." : "Log In"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default LoginPage;