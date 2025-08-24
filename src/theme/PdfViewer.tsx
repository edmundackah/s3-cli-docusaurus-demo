import React, { useState, useEffect } from 'react';
import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './collapsible.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface Props {
  url: string;
  width?: string;
  height?: string;
  title?: string;
}

const PdfViewer: React.FC<Props> = ({ url, width = '100%', height = '800px', title = 'View PDF' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullUrl = useBaseUrl(`/pdfs/${url}`);

  return (
    <div className={styles.collapsibleContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.collapsibleButton}>
        <span>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
      </button>
      {isOpen && (
        <div className={styles.collapsibleContent}>
          <BrowserOnly fallback={<div>Loading PDF...</div>}>
            {() => {
              const [pdfUrl, setPdfUrl] = useState('');
              const isBrowser = useIsBrowser();

              useEffect(() => {
                if (isBrowser && fullUrl) {
                  setPdfUrl(window.location.origin + fullUrl);
                }
              }, [fullUrl, isBrowser]);

              if (!url) {
                return <h2>PDF URL is missing.</h2>;
              }
              if (!isBrowser || !pdfUrl) {
                return <h2>Loading PDF...</h2>;
              }

              return (
                <div style={{ width, height, overscrollBehavior: 'contain' }}>
                  <EmbedPDF
                    companyIdentifier="react-viewer"
                    mode="inline"
                    style={{ width: '100%', height: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    documentURL={pdfUrl}
                  />
                </div>
              );
            }}
          </BrowserOnly>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
