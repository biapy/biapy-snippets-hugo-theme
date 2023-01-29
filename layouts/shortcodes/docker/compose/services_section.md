
#### Services

Declare the stack's `services` section:

```bash
command tee -a "${compose_project_path}/docker-compose.yml" {{ safeHTML "<<" }} EOF
services:
EOF
```
