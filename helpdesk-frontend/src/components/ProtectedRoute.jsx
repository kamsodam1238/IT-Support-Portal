import { Navigate } from "react-router-dom";

function ProtectedRoute({ currentUser, children, allowedRoles }) {
    // If nobody is logged in, send user to login page
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If allowedRoles is provided, check whether the user's role is allowed
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    // If checks pass, render the protected page
    return children;
}

export default ProtectedRoute;