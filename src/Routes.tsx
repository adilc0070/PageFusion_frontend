import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import FileUpladingPage from './Pages/FileUpladingPage'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<FileUpladingPage />} />
            
        </Routes>
    )
}

export default AllRoutes