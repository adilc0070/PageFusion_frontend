import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-primary-content py-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 MyApp. All rights reserved.</p>
                <div>
                    <Link to="/contact" className="link link-hover mx-2">Contact Us</Link>
                    <Link to="/privacy" className="link link-hover mx-2">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
