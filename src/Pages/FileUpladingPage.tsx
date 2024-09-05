import React, { useState, Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PdfUpload = lazy(() => import('../components/PdfUpload'));
const PdfPageList = lazy(() => import('../components/PdfPageList'));

const FileUpladingPage: React.FC = () => {
  const [pages, setPages] = useState<{ preview: string, encodedPdf: string }[]>([]);

  const handleFilesUploaded = (pages: { preview: string, encodedPdf: string }[]) => {
    setPages(pages);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center p-6">
        <Suspense fallback={<div className="w-full max-w-4xl p-6 bg-base-100 shadow-xl rounded-lg border border-base-300">Loading file upload...</div>}>
          <div className="flex-grow w-full items-center justify-center max-w-4xl p-6 bg-base-100 shadow-xl rounded-lg border border-base-300">
            <PdfUpload onFilesUploaded={handleFilesUploaded} />
          </div>
        </Suspense>
        
        {pages.length > 0 && (
          <Suspense fallback={<div className="w-full max-w-4xl p-6 mt-6 bg-base-100 shadow-xl rounded-lg border border-base-300">Loading pages...</div>}>
            <div className="w-full max-w-4xl p-6 mt-6 bg-base-100 shadow-xl rounded-lg border border-base-300">
              <PdfPageList pages={pages} />
            </div>
          </Suspense>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FileUpladingPage;
