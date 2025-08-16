#!/usr/bin/env python3
import re
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MKDOCS_ROOT = REPO_ROOT / 's3-cli' / 'static-site'
DOCS_SRC = MKDOCS_ROOT / 'docs'
WEBSITE_ROOT = REPO_ROOT / 'website'
DOCUSAURUS_DOCS = WEBSITE_ROOT / 'docs'
DOCUSAURUS_STATIC = WEBSITE_ROOT / 'static'

ADMONITION_MAP = {
    'note': 'note',
    'tip': 'tip',
    'info': 'info',
    'success': 'tip',
    'warning': 'warning',
    'danger': 'danger',
    'important': 'info',
    'example': 'info',
}

def convert_admonitions(text: str) -> str:
    # Convert mkdocs-material admonitions: !!! type "Title"\n    indented content
    # to Docusaurus admonitions: :::type [Title]\n  content\n:::
    def _repl(match: re.Match) -> str:
        ad_type = match.group('type').strip()
        title = (match.group('title') or '').strip()
        body = match.group('body')
        mapped = ADMONITION_MAP.get(ad_type, 'info')
        title_part = f" {title}" if title else ''
        # Normalize indentation (remove one leading level common to body)
        lines = body.splitlines()
        # Remove one level of 4-space indent if present
        stripped = []
        for line in lines:
            if line.startswith('    '):
                stripped.append(line[4:])
            else:
                stripped.append(line)
        body_text = '\n'.join(stripped).rstrip() + '\n'
        return f":::{mapped}{title_part}\n{body_text}:::\n"

    pattern = re.compile(
        r"^\s*!!!\s+(?P<type>\w+)\s*(?:\"(?P<title>[^\"]*)\")?\s*\n(?P<body>(?:^[ ]{4}.*\n?)+)",
        re.MULTILINE
    )
    return re.sub(pattern, _repl, text)

def convert_details_blocks(text: str) -> str:
    # Convert ??? abstract "Title" blocks (pymdownx.details) to <details><summary>Title</summary> ... </details>
    def _repl(match: re.Match) -> str:
        title = (match.group('title') or '').strip()
        body = match.group('body')
        lines = body.splitlines()
        stripped = []
        for line in lines:
            if line.startswith('    '):
                stripped.append(line[4:])
            else:
                stripped.append(line)
        body_text = '\n'.join(stripped).rstrip()
        return f"<details>\n<summary>{title}</summary>\n\n{body_text}\n\n</details>\n"

    pattern = re.compile(
        r"^\s*\?\?\?\s+\w+\s*\"(?P<title>[^\"]*)\"\s*\n(?P<body>(?:^[ ]{4}.*\n?)+)",
        re.MULTILINE
    )
    return re.sub(pattern, _repl, text)

def process_markdown_file(src: Path, dst: Path) -> None:
    text = src.read_text(encoding='utf-8')
    text = convert_admonitions(text)
    text = convert_details_blocks(text)
    # mkdocs material horizontal rule usage is identical; mermaid blocks will be handled by theme
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(text, encoding='utf-8')

def copy_static_assets():
    # Copy css/js assets to website/static to preserve paths
    for rel in ['js', 'css']:
        src_dir = DOCS_SRC / rel
        if src_dir.exists():
            dst_dir = DOCUSAURUS_STATIC / rel
            if dst_dir.exists():
                shutil.rmtree(dst_dir)
            shutil.copytree(src_dir, dst_dir)

def migrate_docs():
    if DOCUSAURUS_DOCS.exists():
        shutil.rmtree(DOCUSAURUS_DOCS)
    for path in DOCS_SRC.rglob('*.md'):
        relative = path.relative_to(DOCS_SRC)
        dst = DOCUSAURUS_DOCS / relative
        process_markdown_file(path, dst)

if __name__ == '__main__':
    print('Migrating MkDocs docs to Docusaurus...')
    migrate_docs()
    copy_static_assets()
    print('Done. You can now run `npm install` and `npm run start` in the website directory.')


