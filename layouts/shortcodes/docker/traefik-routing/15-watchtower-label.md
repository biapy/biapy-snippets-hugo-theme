{{/*
Allow Watchtower to update the service.
*/}}

Allow Watchtower to update the service:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node}."com.centurylinklabs.watchtower.enable" = "true"
EOF
```
