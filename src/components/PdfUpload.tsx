import React, { useState, ChangeEvent } from 'react';
import { getDocument } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import { PDFDocument } from 'pdf-lib';
import { BiUpload } from 'react-icons/bi';

interface PdfUploadProps {
  onFilesUploaded?: (pages: { preview: string; encodedPdf: string; }[]) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onFilesUploaded }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handlePdfToPages = async (pdfFile: File) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await getDocument(arrayBuffer).promise;
    const numPages = pdf.numPages;
    const pages: { preview: string, encodedPdf: string }[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        console.error('Failed to get canvas context');
        continue;
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const preview = canvas.toDataURL('image/png');

      const pdfDoc = await PDFDocument.create();
      const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
      const img = await pdfDoc.embedPng(canvas.toDataURL('image/png'));
      newPage.drawImage(img, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
      const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

      pages.push({ preview, encodedPdf: pdfBytes });
    }

    if (onFilesUploaded) {
      onFilesUploaded(pages); 
    }
  };

  const handleSubmit = async () => {
    if (pdfFile) {
      setLoading(true); 
      try {
        await handlePdfToPages(pdfFile); 
      } catch (error) {
        console.error('Error processing PDF:', error);
      } finally {
        setLoading(false); 
      }
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
          <div className="card bg-base-100 w-full sm:w-1/2 shadow-xl border border-base-300">
            <div className="card-body p-4">
              <h2 className="text-primary text-lg font-semibold truncate">{pdfFile.name}</h2>
              <p className="text-sm">Size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="mt-4 text-right">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={loading} 
                >
                  <BiUpload />
                  {loading ? 'Uploading...' : 'Upload'}
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
