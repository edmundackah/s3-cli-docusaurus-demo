import React, { useState, useEffect } from 'react';
import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface Props {
  url: string;
  width?: string;
  height?: string;
}

const PdfViewer: React.FC<Props> = ({ url, width = '100%', height = '800px' }) => {
  const { siteConfig } = useDocusaurusContext();
  const [pdfUrl, setPdfUrl] = useState('');
  const isBrowser = useIsBrowser();
  const baseUrl = useBaseUrl(url);

  useEffect(() => {
    if (isBrowser && url) {
      const finalUrl = window.location.origin + baseUrl;
      setPdfUrl(finalUrl);
    }
  }, [url, baseUrl, isBrowser]);

  if (!url) {
    return <h2>PDF URL is missing.</h2>;
  }

  if (!isBrowser || !pdfUrl) {
    return <h2>Loading PDF...</h2>;
  }

  return (
    <div style={{ width, height, marginBottom: '20px', overscrollBehavior: 'contain' }}>
      <EmbedPDF
        companyIdentifier="react-viewer"
        mode="inline"
        style={{ width: '100%', height: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
        documentURL={pdfUrl}
      />
    </div>
  );
};

export default PdfViewer;
