import React, { useState, ChangeEvent } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface PdfUploadProps {
  onFilesUploaded?: (files: File[]) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onFilesUploaded }) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const filteredFiles = files.filter((file) => file.type === 'application/pdf');
    setPdfFiles((prevFiles) => [...prevFiles, ...filteredFiles]);

    if (onFilesUploaded) {
      onFilesUploaded(filteredFiles);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const base64Files = await Promise.all(pdfFiles.map(file => convertToBase64(file)));
      console.log(base64Files); // Handle the base64 strings as needed
    } catch (error) {
      console.error('Error converting files:', error);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-sunset shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center">
        {/* Top Side with SVG */}
        <div className="flex flex-col items-center mb-6">
          <FiUploadCloud className="w-20 h-20 text-violet-700 mb-4" />
          <label className="block">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-violet-700
                         hover:file:bg-violet-100"
            />
          </label>
        </div>

        {/* Display PDF List with Iframes */}
        {pdfFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {pdfFiles.map((file, index) => {
              const fileUrl = URL.createObjectURL(file); // Create a URL for the file
              return (
                <div key={index} className="card shadow-lg compact bg-base-100">
                  <div className="card-body">
                    <h2 className="card-title text-violet-700 break-words truncate">{file.name}</h2>
                    <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <iframe
                      src={fileUrl}
                      width="100%"
                      height="200px"
                      className="border border-gray-300"
                      title={file.name}
                    />
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => removeFile(index)}
                        className="btn btn-xs btn-error"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Submit Button */}
        {pdfFiles.length > 0 && (
          <button
            onClick={handleSubmit}
            className="btn btn-primary mt-4"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
