import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            
        </Routes>
    )
}

export default AllRoutes