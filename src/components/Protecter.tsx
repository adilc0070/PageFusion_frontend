import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

interface ProtecterProps {
    children: React.ReactNode;
}

export function Protecter({ children }: ProtecterProps) {
    const user = getToken();

    if (!user) {
        return <Navigate to="/register" replace />;
    }

    return <>{children}</>;
}

interface PublicRouteProps {
    children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
    const user = getToken();

    return user ? <Navigate to="/" replace /> : <>{children}</>;
}
