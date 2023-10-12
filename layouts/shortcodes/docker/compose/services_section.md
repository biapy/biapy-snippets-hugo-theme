
#### Services

Declare the stack's `services` section:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
.services |= . + {}
EOF
```
