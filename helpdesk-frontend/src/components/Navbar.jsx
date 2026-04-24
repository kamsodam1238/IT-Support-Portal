import { Link } from "react-router-dom";

function Navbar({ currentUser, logoutUser }) {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                {currentUser &&
                    <div className="navbar-links">
                        <Link to="/tickets">My Tickets</Link>
                        <Link to="/create-ticket">Create Ticket</Link>
                    </div>

                }
                <Link to="/about">About</Link>
                {!currentUser && (
                    <div className="navbar-links">
                        <Link to="/login">Login</Link>
                        <Link to={"/signup"}>Sign Up</Link>
                    </div>
                )}
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