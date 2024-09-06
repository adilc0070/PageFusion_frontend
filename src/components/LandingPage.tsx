import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BiUpload } from 'react-icons/bi';
import { RiPagesLine } from 'react-icons/ri';
import { VscNewFile } from 'react-icons/vsc';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <section className="flex-grow bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to PageFusion</h1>
                        <p className="text-base sm:text-lg mb-6">Your ultimate tool for managing PDFs with ease. Upload, view individual pages, and create new PDFs effortlessly.</p>
                        <Link to="/file" className="btn btn-primary">Get Started</Link>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <img src={'logotwo.png'} alt="PageFusion Overview" className="max-w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>


            <section className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8">Features</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title flex items-center justify-center gap-2 text-lg font-semibold">
                                    <BiUpload />
                                    Upload PDFs
                                </h3>
                                <p>Effortlessly upload your PDFs to the platform and manage them from a single location.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title flex items-center justify-center gap-2 text-lg font-semibold">
                                    <RiPagesLine />
                                    View Individual Pages
                                </h3>
                                <p>View and navigate through individual pages of your PDFs with a clear, user-friendly interface.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title flex items-center justify-center gap-2 text-lg font-semibold">
                                    <VscNewFile />
                                    Create New PDFs
                                </h3>
                                <p>Select pages to create new PDFs, combining or rearranging them to fit your needs.</p>
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
