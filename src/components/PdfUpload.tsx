import React, { useState, ChangeEvent } from 'react';

interface PdfUploadProps {
  onFilesUploaded?: (pages: string[]) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onFilesUploaded }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!pdfFile) return;

    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      const pageUrls = data.pages.map((base64: string) => `data:application/pdf;base64,${base64}`);
      
      if (onFilesUploaded) {
        onFilesUploaded(pageUrls);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-xl rounded-lg border border-base-300">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <label className="block">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="file-input file-input-primary w-full"
            />
          </label>
        </div>

        {pdfFile && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-4">
              <h2 className="text-primary text-lg font-semibold truncate">{pdfFile.name}</h2>
              <p className="text-sm">Size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="mt-4 text-right">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
