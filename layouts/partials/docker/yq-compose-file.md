{{/*

Output yq command to update compose file from stdin, for use in code fences

Usage:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.property = "value"
EOF
```

<!-- markdownlint-disable single-trailing-newline -->

*/}}command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}"