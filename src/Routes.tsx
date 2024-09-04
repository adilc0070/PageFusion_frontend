import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import FileUpladingPage from './Pages/FileUpladingPage';
import Protecter from './components/Protecter'; // Make sure to adjust the path as needed

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            
            {/* Protect routes that require authentication */}
            <Route 
                path="/" 
                element={
                    <Protecter>
                        <FileUpladingPage />
                    </Protecter>
                } 
            />
            
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AllRoutes;
