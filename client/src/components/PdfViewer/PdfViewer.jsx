import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfViewer = ({url}) => {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const onPreviousPage = () => {
    setPage((prevState) => {
      if (prevState-1 > 0) {
          return prevState-1;
      } else return prevState;
    });
  }

  const onNextPage = () => {
    setPage((prevState) => {
      if (prevState+1 <= numPages) {
          return prevState+1;
      } else return prevState;
    });
  }

  return (
    <div className="pdf-viewer-container">
      <Document
        file={{url}}
        className="pdf-container"
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Page pageNumber={page} />
      </Document>
      {
        numPages ? (
          <div className="pdf-controls-container">
            <button
              className="pdf-viewer-controls"
              onClick={onPreviousPage}
            >
                Previous
            </button>
            <span>{`${page} of ${numPages}`}</span>
            <button
              className="pdf-viewer-controls"
              onClick={onNextPage}
            >
              Next
            </button>
          </div>
        ) : null
      }
    </div>
  );
}

export default PdfViewer;
