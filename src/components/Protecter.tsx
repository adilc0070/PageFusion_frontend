import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

interface ProtecterProps {
    children: React.ReactNode;
}

export function Protecter({ children }: ProtecterProps) {
    const user = getToken();

    // If no user token, redirect to /register
    if (!user) {
        return <Navigate to="/register" replace />;
    }

    // If authenticated, render the protected content
    return <>{children}</>;
}

interface PublicRouteProps {
    children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
    const user = getToken();

    // If user is authenticated, redirect them to the home page
    return user ? <Navigate to="/" replace /> : <>{children}</>;
}
