import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import FileUpladingPage from './Pages/FileUpladingPage';
import { Protecter, PublicRoute } from './components/Protecter';
import LandingPage from './components/LandingPage';


const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>

            } />

            <Route
                path="/file"
                element={
                    <Protecter>
                        <FileUpladingPage />
                    </Protecter>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AllRoutes;
