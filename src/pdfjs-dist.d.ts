declare module 'pdfjs-dist/build/pdf' {
    import { PDFDocumentProxy, PDFPageProxy, PDFPromise } from 'pdfjs-dist';
  
    export const getDocument: (source: string | PDFDocumentProxy) => PDFPromise<PDFDocumentProxy>;
    export interface PDFPageProxy {
      getViewport: (params: { scale: number }) => { width: number, height: number };
      render: (params: { canvasContext: CanvasRenderingContext2D, viewport: { width: number, height: number } }) => PDFPromise<void>;
    }
  }
  