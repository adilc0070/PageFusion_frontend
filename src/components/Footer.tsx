import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-primary-content py-4 ">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 PageFusion. All rights reserved.</p>
                <div>
                    <a className="link link-hover mx-2" href="https://adilc0070.site"> Contact </a>
                    <Link to="/" className="link link-hover mx-2"> Home </Link>
                    <Link to="/file" className="link link-hover mx-2"> File </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
