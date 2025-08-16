import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    // Load legacy custom.js
    const custom = document.createElement('script');
    custom.src = '/js/custom.js';
    custom.async = true;
    document.body.appendChild(custom);

    // Confetti removed

    return () => {
      document.body.removeChild(custom);
    };
  }, [siteConfig]);
  return <>{children}</>;
}


