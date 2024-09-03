import{ useState } from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfPageList from '../components/PdfPageList';

const FileUpladingPage = () => {
  const [pages, setPages] = useState<string[]>([]);

  const handleFilesUploaded = (pages: string[]) => {
    setPages(pages);
  };



  return (
    <div className="w-screen h-screen flex flex-col items-center  bg-base-200">
      <div className="flex-grow w-full max-w-4xl p-6 bg-base-100 shadow-xl rounded-lg border border-base-300">
        <PdfUpload onFilesUploaded={handleFilesUploaded} />
      </div>
      {pages.length > 0 && (
        <div className="flex-grow w-full max-w-4xl p-6 mt-6 bg-base-100 shadow-xl rounded-lg border border-base-300">
          <PdfPageList pages={pages}  />
        </div>
      )}
    </div>
  );
};

export default FileUpladingPage;
