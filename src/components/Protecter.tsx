import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import the RootState type
import { Navigate } from "react-router-dom";

interface ProtecterProps {
    children: React.ReactNode;
}

export default function Protecter({ children }: ProtecterProps) {
    const user = useSelector((state: RootState) => state.user.isAuthenticated);

    return user ? <>{children}</> : <Navigate to="/register" />;
}
