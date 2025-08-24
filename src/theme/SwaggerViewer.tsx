import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './collapsible.module.css'; 

interface Props {
  url: string;
  title?: string; 
}

const SwaggerViewer: React.FC<Props> = ({ url, title = 'View API Specification' }) => {
  const fullUrl = useBaseUrl(url);
  const isBrowser = useIsBrowser();

  if (!url) {
    return <h2>Swagger spec URL is missing.</h2>;
  }

  if (!isBrowser) {
    return <h2>Loading Swagger...</h2>;
  }

  return (
    <details className={styles.collapsible}>
      <summary>{title}</summary>
      <div style={{ overscrollBehavior: 'contain' }}>
        <SwaggerUI url={fullUrl} />
      </div>
    </details>
  );
};

export default SwaggerViewer;
