import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Navbar />

            {/* Hero Section */}
            <section className="flex-grow bg-base-200 py-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
                    <p className="text-lg mb-6">Your all-in-one tool for managing and splitting PDFs with ease.</p>
                    <Link to="/file" className="btn btn-primary">Get Started</Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-base-100 py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title">Feature 1</h3>
                                <p>Detail about feature 1. Describe the functionality and benefits.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title">Feature 2</h3>
                                <p>Detail about feature 2. Describe the functionality and benefits.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title">Feature 3</h3>
                                <p>Detail about feature 3. Describe the functionality and benefits.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
