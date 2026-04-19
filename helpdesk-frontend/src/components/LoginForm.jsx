import { useState } from "react";

function LoginForm(){
    // Stores the email typed by the user
    const [email, setEmail] = useState("");

     // Stores the password typed by the user
    const [password, setPassword] = useState("");
    
    // Stores the role typed by the user
    const [role, setRole] = useState("");

    // change all role input to lowercase for a better validation
    const cleanedRole = role.toLowerCase();

    // Stores message to show after login
    // Example: error message or success message
    const [message, setMessage] = useState("");

    // This function runs when the form is submitted
    function handleSubmit(event){
        // Prevent the page from refreshing
        event.preventDefault();
        
        // Checks if any field is empty
        if (email === "" || password === "" || role === "") {
            setMessage("Please fill in all the fields");
            return;
        }
        
        // Check if the role is one of the allowed values
        if (cleanedRole !== "employee" && cleanedRole !== "agent" && cleanedRole !== "admin") {
            setMessage("Role must be employee, agent, or admin.");
            return;
        }

        // Displays message if every checks pass
        setMessage(`Welcome back, ${email}! Role: ${cleanedRole}`);

        // Clear only password after successful login
        setPassword("");
    }

    return (
        // OnSubmit tells React what function to run when the form is submitted
        <form 
            onSubmit={handleSubmit} 
            style={{ 
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                maxWidth: "400px"
            }}
        >
            <h2>Login</h2>

            <div style={{ marginBottom: "12px" }}>
                <label>Email</label>
                <br />
                <input 
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} 
                    placeholder="Enter your email"
                    style={{ width: "100%", padding: "8px", marginTop:  "4px" }}
                />
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label>Password</label>
                <br />
                <input 
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                />
            </div>
            
            <div style={{ marginBottom: "12px" }}>
                <label >Role</label>
                <br />
                <input 
                    type="text"
                    value={role} 
                    onChange={(event) => setRole(event.target.value)}
                    placeholder="Enter role"
                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                />
            </div>

            <button type="submit" style={{ padding: "10px 16px"}}>
                Login   
            </button>

            {message && (
                <p style={{ marginTop: "12px" }}>
                    {message}
                </p>)}
        </form>
    );
}

export default LoginForm;

/*
A. Email state
const [email, setEmail] = useState("");

Starts as an empty string.

B. Password state
const [password, setPassword] = useState("");
C. Input value
value={email}

This means the input is controlled by React state.

D. Input change
onChange={(event) => setEmail(event.target.value)}

Whenever the user types, React updates the state.

E. Form submit
function handleSubmit(event) {
  event.preventDefault();
}

This stops the browser from refreshing the page.

New idea: conditional rendering

This line:

{message && <p>{message}</p>}

means:

if message has a value, show the paragraph
if message is empty, show nothing

That is called conditional rendering.

React uses this a lot.


*/