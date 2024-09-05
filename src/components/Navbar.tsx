import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch if you're using Redux for state management
import { logoutUser } from '../services/apiService';
import { setUserLogout } from '../store/slice/slice';
import { getToken } from '../utils/auth';
import { RiLogoutBoxLine, RiRegisteredLine } from 'react-icons/ri';
import { FaFileUpload } from 'react-icons/fa';
import { BiHome } from 'react-icons/bi';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // If you're using Redux, else omit this line
    const userExist = getToken();
    const handleLogout = () => {
        logoutUser();
        dispatch(setUserLogout());
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <header className="bg-primary text-primary-content py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="logotwo.png" alt="MyApp Logo" className="h-12 w-auto" />
                    <span className="text-2xl font-bold ml-4">PageFusion</span>
                </div>
                <nav>
                    {userExist ? (
                        <>
                            <Link to="/" className="btn btn-primary mx-2 border border-teal-950">
                                    <BiHome/>
                                Home
                                </Link>
                            <Link to="/file" className="btn btn-primary mx-2 border border-teal-950">
                                <FaFileUpload />
                            File
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary mx-2"
                            >
                                Logout
                                <RiLogoutBoxLine />
                            </button>
                        </>

                    ) :

                        <Link to="/register" className="btn btn-primary mx-2 border border-teal-950">
                                <RiRegisteredLine />
                                Register
                        </Link>
                    }

                </nav>
            </div>
        </header>
    );
};

export default Navbar;
