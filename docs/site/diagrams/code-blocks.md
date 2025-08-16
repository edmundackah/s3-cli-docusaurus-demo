# Code blocks: tips and patterns

Code blocks are used widely in our docs. Follow these guidelines for clarity and accessibility.

## Basics
- Use fenced code blocks with a language identifier for syntax highlighting.

```bash
python s3-cli.py --help
```

```json
{
  "bucket": "my-bucket",
  "prefix": "/static/"
}
```

## Copy buttons
- Code blocks include a copy button by default.
- Keep lines under ~100 characters to avoid wrapping.

## Multiline commands
Prefer line continuations with backslashes for readability:

```bash
python s3-cli.py deploy-release \
  --bucket my-bucket \
  --package test-app-1.0.0.tgz \
  --target-server ECS_S3
```

## Annotations
Use comments for inline explanations; avoid mixing prose into code blocks.

```bash
# Upload a single file
python s3-cli.py upload-file \
  --bucket my-bucket \
  --file ./index.html \
  --prefix /site/
```

## Accessibility
- Ensure sufficient contrast in terminal screenshots (prefer dark background with light text).
- Don’t rely solely on color to convey meaning; include short text notes where needed.

## Titles, line numbers, and highlights
Add titles to code blocks for context, and enable line numbers when useful:

```bash title="Deploy a release (ECS)"
# highlight-next-line
python s3-cli.py deploy-release \
  --bucket my-bucket \
  --package test-app-1.0.0.tgz \
  --target-server ECS_S3
```

Block highlight ranges:

```yaml title="maintenance.yaml"
# highlight-start
maintenance:
  enabled: true
  message: "Scheduled maintenance"
# highlight-end
```

You can also use `showLineNumbers` per block:

```bash showLineNumbers
python s3-cli.py --help
```

## Advanced language examples

### Java
```java title="S3Uploader.java" showLineNumbers
import java.nio.file.Path;

public class S3Uploader {
  public void upload(Path folder) {
    // highlight-next-line
    System.out.println("Uploading to S3...");
  }
}
```

### TypeScript
```ts title="config.ts" showLineNumbers
type Profile = {
  name: string;
  bucket: string;
  prefix?: string;
};

export const dev: Profile = { name: 'dev', bucket: 'my-bucket', prefix: '/site' };
```

### JSX
```jsx title="Button.jsx" showLineNumbers
export default function Button({ label }) {
  return <button onClick={() => alert(label)}>{label}</button>;
}
```

### TSX
```tsx title="Button.tsx" showLineNumbers
type Props = { label: string };
export function Button({ label }: Props) {
  return <button>{label}</button>;
}
```

### Terraform (HCL)
```hcl title="s3.tf" showLineNumbers
resource "aws_s3_bucket" "docs" {
  bucket = "my-docs-bucket"
  acl    = "private"
}
```

### Bash
```bash title="deploy.sh" showLineNumbers
#!/usr/bin/env bash
set -euo pipefail

python s3-cli.py deploy-snapshot \
  --folder-path ./website/build \
  --bucket my-docs-bucket \
  --prefix /docs/s3-cli/ \
  --target-server AWS_S3
```
