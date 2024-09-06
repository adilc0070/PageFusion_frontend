import React, { useEffect, useState } from 'react';
import { FiFile } from 'react-icons/fi';

interface PdfPageListProps {
    pages: { preview: string, encodedPdf: string }[];
}

const PdfPageList: React.FC<PdfPageListProps> = ({ pages }) => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>(new Array(pages.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxes = [...selectedCheckboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setSelectedCheckboxes(updatedCheckboxes);
    };
    useEffect(() => {
        setSelectedCheckboxes(new Array(pages.length).fill(false));
    }, [pages])
    const handleSelectOddPages = () => {
        const updatedCheckboxes = selectedCheckboxes.map((_, index) => index % 2 === 0);
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const handleSelectEvenPages = () => {
        const updatedCheckboxes = selectedCheckboxes.map((_, index) => index % 2 !== 0);
        setSelectedCheckboxes(updatedCheckboxes);
    };
    const handleClearSelection = () => {
        setSelectedCheckboxes(new Array(pages.length).fill(false));
    };

    const handleGeneratePdf = async () => {
        const selectedPages = pages.filter((_, index) => selectedCheckboxes[index] && pages[index].encodedPdf);

        if (selectedPages.length === 0) {
            alert('No pages selected');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASEURL}/pdf/generate-pdf`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pages: selectedPages.map(page => page.encodedPdf) }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const pdfBlob = await response.blob();

            const url = URL.createObjectURL(pdfBlob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `pageFusion.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="relative w-full h-full">
            <div className="flex justify-between items-center space-x-4 mb-4">
                <button onClick={handleGeneratePdf} className="btn btn-primary">
                    <FiFile />
                    Generate PDF
                </button>
                <div className="dropdown z-40">
                    <label tabIndex={0} className="btn btn-outline">Options</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                        <li><button onClick={handleSelectOddPages} className="">Select Odd Pages</button></li>
                        <li><button onClick={handleSelectEvenPages} className="">Select Even Pages</button></li>
                        <li><button onClick={handleClearSelection} className="">Clear Selection</button></li>
                    </ul>
                </div>

            </div>

            <div className="overflow-y-auto max-h-96 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                <img src={page.preview} alt={`Page ${index + 1}`} className="w-full mb-2 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfPageList;
