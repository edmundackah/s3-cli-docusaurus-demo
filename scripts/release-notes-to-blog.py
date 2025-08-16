#!/usr/bin/env python3
import re
from pathlib import Path
from datetime import datetime, timedelta

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / 'docs' / 'release-note.md'
BLOG = ROOT / 'announcements'

VERSION_RE = re.compile(r'^##\s+V(?P<version>[0-9]+\.[0-9]+\.[0-9]+)\s*$', re.MULTILINE)

def split_versions(text: str):
    positions = [(m.start(), m.end(), m.group('version')) for m in VERSION_RE.finditer(text)]
    sections = []
    for i, (s, e, version) in enumerate(positions):
        start = s
        end = positions[i+1][0] if i + 1 < len(positions) else len(text)
        sections.append((version, text[start:end].strip()))
    return sections

def sanitize_excerpt(md: str) -> str:
    """Extract a short, YAML-safe description from the first textual paragraph.

    - Skips headings, admonition fences (:::) and code fences (```).
    - Strips markdown, backticks, and excess whitespace.
    - Truncates to ~200 chars.
    - Escapes quotes for YAML string usage.
    """
    lines = [l.rstrip() for l in md.splitlines()]
    # Drop heading line if present
    if lines and lines[0].startswith('## '):
        lines = lines[1:]

    cleaned = []
    in_code = False
    for l in lines:
        s = l.strip()
        # Handle code fences
        if s.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        # Skip admonition fences and html details tags
        if s.startswith(':::') or s.startswith('<details') or s.startswith('</details') or s.startswith('<summary'):
            continue
        # Skip empty
        if not s:
            if cleaned and cleaned[-1] != '':
                cleaned.append('')
            continue
        cleaned.append(s)

    # Join until first blank line as paragraph
    paragraph = []
    for s in cleaned:
        if s == '':
            break
        paragraph.append(s)
    text = ' '.join(paragraph)

    # Strip simple markdown artifacts
    text = re.sub(r'[`*_>#\[\]]', '', text)
    text = re.sub(r'\s{2,}', ' ', text).strip()
    # Truncate
    if len(text) > 200:
        text = text[:197].rstrip() + '...'
    # Escape quotes
    text = text.replace('"', '\\"')
    return text

def write_post(version: str, content: str, date: datetime):
    BLOG.mkdir(parents=True, exist_ok=True)
    slug = f"release-{version}"
    filename = f"{date.strftime('%Y-%m-%d')}-{slug}.md"
    path = BLOG / filename
    title = f"Release {version}"
    description = sanitize_excerpt(content)
    frontmatter = (
        f"---\n"
        f"title: \"{title}\"\n"
        f"slug: {slug}\n"
        f"description: \"{description}\"\n"
        f"tags: [release]\n"
        f"---\n\n"
    )
    # Ensure content starts with a single H1 for the post body
    body = re.sub(r'^##\s+V', '# V', content, count=1, flags=re.MULTILINE)
    intro = (description + "\n\n") if description else ""
    truncated = "<!-- truncate -->\n\n"
    path.write_text(frontmatter + intro + truncated + body + "\n", encoding='utf-8')
    print(f"Wrote {path}")

def main():
    if not DOC.exists():
        print(f"Not found: {DOC}")
        return
    text = DOC.read_text(encoding='utf-8')
    sections = split_versions(text)
    # Assign descending dates starting today, one day apart
    base = datetime.today()
    for i, (version, md) in enumerate(sections):
        write_post(version, md, base - timedelta(days=i))

if __name__ == '__main__':
    main()


