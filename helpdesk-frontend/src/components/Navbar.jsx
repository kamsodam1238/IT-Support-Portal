import { Link } from "react-router-dom";

function Navbar({ currentUser, logoutUser }) {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                <Link to="/tickets">My Tickets</Link>
                <Link to="/create-ticket">Create Ticket</Link>
                <Link to="/about">About</Link>
                {!currentUser && <Link to="/login">Login</Link>}
            </div>

            {currentUser && (
                <div className="navbar-user">
                    <span>
                        Signed in as <strong>{currentUser.name}</strong> ({currentUser.role})
                    </span>

                    <button className="button button-secondary" onClick={logoutUser}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;