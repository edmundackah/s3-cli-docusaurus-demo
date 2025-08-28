import type { Config } from '@docusaurus/types';
import type { Options as ClassicPresetOptions, ThemeConfig } from '@docusaurus/preset-classic';
import fs from 'fs';
import path from 'path';

function slugifyLabel(labelOrDir: string): string {
  return labelOrDir
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTopNavDocsCategories(): { to: string; label: string; position: 'left' }[] {
  const docsDir = path.join(__dirname, 'docs');
  let items: { to: string; label: string; position: 'left' }[] = [];
  if (!fs.existsSync(docsDir)) return items;
  const entries = fs.readdirSync(docsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirName = entry.name;
    if (dirName.startsWith('.')) continue;
    const dirPath = path.join(docsDir, dirName);
    const categoryFile = path.join(dirPath, '_category_.json');
    let hasDocs = false;
    let label: string | undefined;
    if (fs.existsSync(categoryFile)) {
      try {
        const json = JSON.parse(fs.readFileSync(categoryFile, 'utf-8'));
        // Support standard fields and a custom nav.hidden to exclude from navbar
        if (json.nav && json.nav.hidden === true) {
          continue;
        }
        // Allow nav.label to override category label just for navbar
        label = (json.nav && json.nav.label) || (json.label as string | undefined);
        hasDocs = true;
      } catch {}
    }
    if (!hasDocs) {
      // Heuristic: check for any md/mdx at this level
      const child = fs.readdirSync(dirPath);
      hasDocs = child.some((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    }
    if (!hasDocs) continue;
    // Compute display label
    const displayLabel = label
      ? label
      : dirName
          .split(/[-_]/g)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
    // Link to the generated category index page (slug is based on label when present)
    const slug = slugifyLabel(label ?? dirName);
    items.push({ to: `/category/${slug}`, label: displayLabel, position: 'left' });
  }
  return items;
}

const config: Config = {
  title: 'S3 Deployment CLI',
  tagline: 'Automate S3 deployments and static asset management',
  favicon: 'img/logo.svg',
  url: 'https://mydomain.org',
  baseUrl: '/docs/s3-cli/',
  trailingSlash: false,
  organizationName: 'my-org',
  projectName: 's3-cli',
  customFields: {},
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@docusaurus/theme-mermaid'],
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap',
      rel: 'stylesheet',
    },
  ],
  scripts: [],
  markdown: {
    mermaid: true,
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: undefined,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: {
          path: 'announcements',
          routeBasePath: '/announcements',
          blogTitle: 'Announcements',
          blogDescription: 'Release notes and updates for S3 Deployment CLI',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          feedOptions: { type: ['atom', 'rss'], xslt: true },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./static/css/termynal.css'),
          ],
        },
        gtag: undefined,
      } satisfies ClassicPresetOptions,
    ],
  ],
  plugins: [
    
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        language: ['en'],
        docsRouteBasePath: '/',
      },
    ],
    ['docusaurus-plugin-drawio', {}],
    [
      'docusaurus-plugin-image-zoom',
      {
        selector: '.theme-doc-markdown img:not(.no-zoom), .markdown > img:not(.no-zoom)',
        background: {
          light: 'rgba(255,255,255,0.95)',
          dark: 'rgba(0,0,0,0.95)'
        },
        config: {
          margin: 24,
          scrollOffset: 60
        }
      }
    ]
  ],
  themeConfig: {
    navbar: {
      title: 'S3 Deployment CLI',
      logo: { alt: 'S3 CLI', src: 'img/logo.svg' },
      items: [
        // Show API only after docs generation step is used
        { to: '/announcements', label: 'Announcements', position: 'left' },
        ...getTopNavDocsCategories(),
        { type: 'search', position: 'right' },
        { href: 'https://github.com/your-repo/s3-cli', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Home', to: '/' },
            { label: 'Release Notes', to: '/release-note' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Issues', href: 'https://github.com/your-repo/s3-cli/issues' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} S3 Deployment CLI`,
    },
    // Use default Prism theme
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      additionalLanguages: [
        'bash',
        'json',
        'yaml',
        'python',
        'docker',
        'ini',
        'powershell',
        'diff',
        'go',
        'java',
        'typescript',
        'tsx',
        'javascript',
        'jsx',
        'hcl',
        'toml'
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line'
        },
        {
          className: 'theme-code-block-highlighted-line',
          block: { start: 'highlight-start', end: 'highlight-end' }
        }
      ],
      defaultLanguage: undefined,
      showLineNumbers: true
    },
  },
};

export default config;


