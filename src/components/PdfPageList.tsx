import React, { useState } from 'react';

interface PdfPageListProps {
    pages: string[];
    onRemoveFile: () => void;
}

const PdfPageList: React.FC<PdfPageListProps> = ({ pages, onRemoveFile }) => {
    const [selectedPage, setSelectedPage] = useState<string | null>(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>(new Array(pages.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxes = [...selectedCheckboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const handleOpenModal = (page: string) => {
        setSelectedPage(page);
    };

    const handleCloseModal = () => {
        setSelectedPage(null);
    };

    const handleGeneratePdf = async () => {
        // Collect selected pages
        const selectedPages = pages.filter((_, index) => selectedCheckboxes[index]);
    
        if (selectedPages.length === 0) {
            alert('No pages selected');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pages: selectedPages }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }
            
            const result = await response.json(); // Get JSON response
            const pdfBase64 = result.pdf;
            console.log(pdfBase64);
            
            // Extract the base64 part from the data URL
            const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    
            // Decode base64 string to binary data
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
    
            // Create a Blob from the binary data
            const blob = new Blob([byteArray], { type: 'application/pdf' });
    
            // Create a URL for the Blob and open it
            const url = URL.createObjectURL(blob);
            window.open(url);
    
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    
    return (
        <div className="relative w-full h-full">
            <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pages.map((page, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl border border-base-300">
                            <div className="card-body p-4">
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedCheckboxes[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                        className="checkbox checkbox-primary mr-2"
                                    />
                                    <h2 className="text-primary text-base sm:text-lg font-semibold">Page {index + 1}</h2>
                                </div>
                                <div className="relative w-full h-32 sm:h-48 md:h-56 lg:h-72 mb-2 cursor-pointer">
                                    <iframe
                                        src={page}
                                        allowFullScreen
                                        className="w-full h-full border-none"
                                        title={`Page ${index + 1}`}
                                    />
                                    <button
                                        onClick={() => handleOpenModal(page)}
                                        className="absolute top-2 right-2 btn btn-circle btn-primary"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleGeneratePdf} className="btn btn-primary mt-4">Generate PDF</button>
            </div>

            {/* Modal */}
            {selectedPage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="card bg-base-100 p-4 rounded-lg w-full max-w-4xl relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 btn btn-circle btn-neutral"
                        >
                            &times;
                        </button>
                        <iframe
                            src={selectedPage}
                            className="w-full h-[80vh] border-none"
                            title="Selected Page"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfPageList;
