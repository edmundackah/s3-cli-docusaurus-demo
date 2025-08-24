import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './collapsible.module.css';

type RapiDocProps = {
  'spec-url': string;
  'theme'?: 'light' | 'dark';
  'bg-color'?: string;
  'text-color'?: string;
  'primary-color'?: string;
  'render-style'?: 'read' | 'view' | 'focused';
  'show-header'?: 'false' | 'true';
  'show-info'?: 'false' | 'true';
  'allow-search'?: 'false' | 'true';
  'allow-advanced-search'?: 'false' | 'true';
  style?: React.CSSProperties;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rapi-doc': RapiDocProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface SwaggerViewerProps {
  url: string;
  title?: string;
}

const SwaggerViewer: React.FC<SwaggerViewerProps> = ({ url, title = 'View API Specification' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullUrl = useBaseUrl(`/api/${url}`);

  return (
    <div className={styles.collapsibleContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.collapsibleButton}>
        <span>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
      </button>
      {isOpen && (
        <div className={styles.collapsibleContent}>
          <BrowserOnly fallback={<div>Loading API Specification...</div>}>
            {() => {
              require('rapidoc');
              const { colorMode } = useColorMode();
              const isDarkTheme = colorMode === 'dark';

              return (
                <rapi-doc
                  spec-url={fullUrl}
                  theme={isDarkTheme ? 'dark' : 'light'}
                  bg-color={isDarkTheme ? '#0f1115' : '#ffffff'}
                  text-color={isDarkTheme ? '#e5e7eb' : '#1f2937'}
                  primary-color="#4C0B8A"
                  render-style="view"
                  show-header="false"
                  show-info="true"
                  allow-search="true"
                  allow-advanced-search="false"
                  style={{ height: '80vh', width: '100%', display: 'flex' }}
                />
              );
            }}
          </BrowserOnly>
        </div>
      )}
    </div>
  );
};

export default SwaggerViewer;
