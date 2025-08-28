### MR: Docs migration to Docusaurus

- **Overview**: Migrate the docs site from MkDocs (Material) to Docusaurus 3.8.1 for a faster, modern experience with dark mode and better authoring.
- **Why**: Improved UX, local search, first-class diagrams (Mermaid/Draw.io), and reusable viewers for PDFs and Swagger.
- **Key changes**:
  - New site under `website/` with docs in `website/docs/` and announcements in `website/announcements/`
  - Config via `website/docusaurus.config.ts`; sidebars via `website/sidebars.ts`
  - Plugins: local search, Draw.io, image zoom
  - Components: `PdfViewer` and `SwaggerViewer` for embedded docs/specs
  - Static assets moved to `website/static/` (served at site root)
  - Base URL set to `/docs/s3-cli/` with `trailingSlash: false`
- **How to test**:
  ```bash
  cd website
  npm install
  npm run start
  ```
  - Open `/docs/s3-cli/` and `/docs/s3-cli/announcements/`
  - Verify PDF and Swagger examples render
- **References**:
  - Migration notes: `website/docs/site/mkdocs-migration.mdx`
  - Announcement: `annoucment.md`


