# How to add or edit docs

Adding content is simple and safe. You only need basic Markdown.

## 1) Where to add files
- Put pages in `website/docs`.
- Use folders to group topics (e.g. `command/`, `config-management/`).

## 2) Page basics
- Start with a `# Title` on the first line.
- Use `##` and `###` for sections.
- Link to other pages using relative links like `[Deploy snapshot](command/deploy-snapshot.md)`.

## 3) Callouts (notes, tips, warnings)
Use these blocks to highlight key information:

```md
:::tip Quick start
Use `--help` with any command.
:::
```

```md
:::warning Mandatory Change Record
Make sure a change record is approved before running any deploy command.
:::
```

## 4) Collapsible sections
```md
<details>
<summary>Advanced options</summary>

- Option A
- Option B

</details>
```

## 5) Code blocks
```bash
python s3-cli.py deploy-snapshot --help
```

## 6) Preview your changes
- Start the docs locally:
  - In a terminal: `cd website && npm install && npm run start`
- Your browser opens at `http://localhost:3000/` with live reload.

## 7) Submit changes
- Commit your edits and open a pull request. A reviewer will help polish formatting if needed.

If you’re unsure about anything, just write your content plainly—we’ll help with formatting during review.
