import { Link } from "react-router-dom";

function Navbar({ currentUser, logoutUser }) {
    return (
        <nav style={{ marginBottom: "20px" }}>
            <Link to="/" style={{ marginRight: "12px" }}>Dashboard</Link>
            <Link to="/about" style={{ marginRight: "12px" }}>About</Link>

            {currentUser ? (
                <>
                    <Link to="/tickets" style={{ marginRight: "12px" }}>Tickets</Link>
                    <Link to="/create-ticket" style={{ marginRight: "12px" }}>Create Ticket</Link>

                    <span style={{ marginLeft: "20px" }}>
                        Signed in as <strong>{currentUser.name}</strong> ({currentUser.role})
                        <button
                            onClick={logoutUser}
                            style={{ marginLeft: "12px", padding: "6px 10px" }}
                        >
                            Logout
                        </button>
                    </span>
                </>
            ) : (
                <Link to="/login" style={{ marginRight: "12px" }}>Login</Link>
            )}
        </nav>
    );
}

export default Navbar;