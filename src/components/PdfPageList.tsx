import React, { useState } from 'react';

interface PdfPageListProps {
    pages: string[];
}

const PdfPageList: React.FC<PdfPageListProps> = ({ pages }) => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>(new Array(pages.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxes = [...selectedCheckboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const handleGeneratePdf = async () => {
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
    
            // Create a Blob from the response
            const pdfBlob = await response.blob();
    
            // Create an object URL for the Blob
            const url = URL.createObjectURL(pdfBlob);
    
            // Create a link element, set its href to the object URL, and simulate a click
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
    
            // Revoke the object URL after the download
            URL.revokeObjectURL(url);
    
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
                                <img src={page} alt={`Page ${index + 1}`} className="w-full mb-2 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleGeneratePdf} className="btn btn-primary mt-4">Generate PDF</button>
            </div>
        </div>
    );
};

export default PdfPageList;
