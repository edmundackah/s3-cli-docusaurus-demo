import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="S3 Deployment CLI"
      description="Automate S3 deployments and static asset management"
    >
      <header className={`hero ${styles.hero}`}>
        <div className="container">
          <h1 className={styles.heroTitle}>S3 Deployment CLI</h1>
          <p className={styles.heroSubtitle}>
            Automate S3 deployments and static asset management with confidence.
          </p>
          <div className={styles.cta}>
            <Link className="button button--primary" to="/command/deploy-snapshot">
              Get Started
            </Link>
            <Link className="button button--secondary" to="/announcements">
              Announcements
            </Link>
            <Link className="button button--secondary" to="/site/mkdocs-migration">
              Migrating from MkDocs
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={`container ${styles.section}`}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Deploy Snapshots</h3>
              <p className={styles.muted}>Upload local builds safely to S3, with metadata support.</p>
              <Link className="button button--sm button--primary" to="/command/deploy-snapshot">
                Learn more
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Release from Artifacts</h3>
              <p className={styles.muted}>Deploy `.tgz` releases directly from your artifact repository.</p>
              <Link className="button button--sm button--primary" to="/command/deploy-release">
                Learn more
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Maintenance Flags</h3>
              <p className={styles.muted}>Create, verify, and deploy maintenance windows with control.</p>
              <Link className="button button--sm button--primary" to="/command/deploy-maintenance">
                Learn more
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Docs for Everyone</h3>
              <p className={styles.muted}>Mermaid, Draw.io, and code snippets tailored for contributors.</p>
              <Link className="button button--sm button--primary" to="/site/diagrams/mermaid-guide">
                Learn more
              </Link>
            </article>
          </div>
        </section>

        <section className={`container ${styles.section}`}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Configuration</h3>
              <p className={styles.muted}>Profiles and overrides for every environment.</p>
              <Link className="button button--sm button--secondary" to="/config-management/getting-started">
                Read docs
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Local Search</h3>
              <p className={styles.muted}>Type to find commands, options, and examples instantly.</p>
              <Link className="button button--sm button--secondary" to="/">
                Try search ↑
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Contribute</h3>
              <p className={styles.muted}>Edit pages in Markdown/MDX. No setup required.</p>
              <Link className="button button--sm button--secondary" to="/site/blogging">
                Start contributing
              </Link>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}


