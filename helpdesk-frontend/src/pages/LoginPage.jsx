import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { loginUser } from "../services/authService";

function LoginPage({ setCurrentUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanedEmail = email.trim();
        const cleanedPassword = password.trim();

        if (cleanedEmail === "" || cleanedPassword === "") {
            setMessage("Please enter both email and password.");
            return;
        }

        try {
            const result = await loginUser({
                email: cleanedEmail,
                password: cleanedPassword
            });

            if (result.success) {
                // Save user info in localStorage
                localStorage.setItem("currentUser", JSON.stringify(result));

                // Update app-level user state
                setCurrentUser(result);

                setMessage("Login successful.");
                navigate("/");
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage(error.message);
        }

        if (localStorage.getItem("currentUser")) {
            return <Navigate to="/" replace />;
        }
    }
    return (
        <div>
            <PageHeading text={"Login"} />

            <form
                onSubmit={handleSubmit}
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "400px"
                }}
            >
                <div style={{ marginBottom: "12px" }} >
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <button type="submit" style={{ padding: "10px 16px" }}>
                    Log In
                </button>

                {message && <p style={{ marginTop: "12px" }}>{message}</p>}
            </form>

        </div>
    );
}

export default LoginPage;