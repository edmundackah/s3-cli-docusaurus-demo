import React, { useState, useEffect, Suspense } from 'react';
const LazyEmbedPDF = React.lazy(async () => {
  const m = await import('@simplepdf/react-embed-pdf');
  return { default: (m.EmbedPDF as unknown) as React.ComponentType<any> };
});
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
          <BrowserOnly fallback={<div style={{ width, height }} aria-busy="true" />}>
            {() => {
              const [pdfUrl, setPdfUrl] = useState<string | null>(null);

              useEffect(() => {
                if (fullUrl) {
                  setPdfUrl(window.location.origin + fullUrl);
                }
              }, [fullUrl]);

              if (!url) {
                return <h2>PDF URL is missing.</h2>;
              }
              if (!pdfUrl) {
                return <div style={{ width, height }} aria-busy="true" />;
              }

              return (
                <div style={{ width, height, overscrollBehavior: 'contain' }}>
                  <Suspense fallback={<div style={{ width: '100%', height: '100%' }} aria-busy="true" />}>
                    <LazyEmbedPDF
                      companyIdentifier="react-viewer"
                      mode="inline"
                      style={{ width: '100%', height: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                      documentURL={pdfUrl}
                    />
                  </Suspense>
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
