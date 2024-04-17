{{/*

Output yq command to update compose file from stdin, for use in code fences

Usage:

```bash
{{% code/docker/yq-compose-file %}} <<EOF
.property = "value"
EOF
```

*/}}
command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}"