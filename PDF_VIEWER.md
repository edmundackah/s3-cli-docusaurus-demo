# Integrating the PDF Viewer into a Docusaurus Project

This guide explains how to add a read-only PDF viewer component to your Docusaurus website.

## 1. Install Dependencies

First, you need to add the `@simplepdf/react-embed-pdf` package to your project. Open your terminal at the root of your Docusaurus `website` directory and run the following command:

```bash
npm install @simplepdf/react-embed-pdf
```

## 2. Create the PdfViewer Component

Next, create a new file at `src/theme/PdfViewer.tsx` and add the following code. This component wraps the PDF viewer library and handles URL resolution for both local development and production builds.

```tsx
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
    return <div>PDF URL is missing.</div>;
  }

  if (!isBrowser || !pdfUrl) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div style={{ width, height, marginBottom: '20px' }}>
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
```

## 3. Usage in Markdown (`.mdx`)

To embed a PDF in any of your `.mdx` pages, first import the `PdfViewer` component at the top of the file:

```md
import PdfViewer from '@theme/PdfViewer';
```

Then, use the component in your content. The `url` should point to a PDF file located in your `static` directory.

### Basic Usage

```md
<PdfViewer url="/pdfs/your-document.pdf" />
```

### Custom Dimensions

You can also specify the `width` and `height` of the viewer:

```md
<PdfViewer url="/pdfs/your-document.pdf" width="800px" height="600px" />
```

That's it! You should now have a working PDF viewer on your Docusaurus site.
