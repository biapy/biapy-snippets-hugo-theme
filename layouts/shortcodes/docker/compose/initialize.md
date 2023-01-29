Initialize the `docker-compose.yml` file:

```bash
command tee "${compose_project_path}/docker-compose.yml" <<EOF
# docker-compose.yml for ${project_name}
#

version: "3.8"
EOF
```
