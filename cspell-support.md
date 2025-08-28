### CSpell support (UK English)

A quick guide to fix common spelling-check issues when using CSpell with UK English.

### Quick setup

Create `cspell.json` at the repo root:
```json
{
  "version": "0.2",
  "language": "en-GB",
  "useGitignore": true,
  "ignorePaths": ["**/node_modules/**", "**/build/**", "**/.docusaurus/**"],
  "overrides": [{ "filename": ["**/*.md", "**/*.mdx"], "language": "en-GB" }]
}
```

Run checks:
```bash
npx cspell "website/docs/**/*.md*" "website/announcements/**/*.md*"
```

### Common issues and fixes

- **US vs UK spelling flagged**: Ensure `language` is `en-GB`. Prefer UK forms (colour, organisation, licence). For a US-only page:
  ```md
  <!-- cspell:locale en-US -->
  ```

- **Product names/acronyms marked wrong**:
  - One-off inline allow:
    ```md
    <!-- cspell:ignore Docusaurus Rapidoc OpenAPI -->
    ```
  - Project-wide allow: add to `cspell.json` `"words": ["Docusaurus", "Rapidoc", "OpenAPI"]` or maintain `cspell-words.txt` and reference via `dictionaryDefinitions`.

- **Generated/vendor files cause noise**: Add directories to `ignorePaths` (e.g., `**/build/**`, `**/.docusaurus/**`, `**/*.tgz`).

- **Hyphenated/compound words**: Add the exact hyphenated form to dictionary, or enable compounds:
  ```json
  { "allowCompoundWords": true }
  ```

- **Noisy code blocks**: Temporarily disable/enable around a section:
  ```md
  <!-- cspell:disable -->
  <noisy snippet>
  <!-- cspell:enable -->
  ```

- **Single line false positive**:
  ```md
  <!-- cspell:disable-next-line -->
  UnusualWordThatIsFine
  ```

- **Mixed-language pages**:
  ```md
  <!-- cspell:locale en-GB,en-US -->
  ```

- **CI failures with little context**: Use clearer output and fail fast:
  ```bash
  npx cspell --no-progress --show-context --color --fail-fast \
    "website/docs/**/*.md*" "website/announcements/**/*.md*"
  ```

### Team conventions (recommended)

- Default to UK English (`en-GB`).
- Keep a shared dictionary for recurring domain terms.
- Prefer fixing typos over whitelisting.
- Use inline `<!-- cspell:ignore ... -->` sparingly; promote recurring terms to the shared dictionary.

### Useful commands

```bash
# Check everything (can be noisy)
npx cspell "**/*"

# Check docs only
npx cspell "website/docs/**/*.md*" "website/announcements/**/*.md*"

# JSON output for tooling
npx cspell "website/docs/**/*.md*" --no-progress --json
```


