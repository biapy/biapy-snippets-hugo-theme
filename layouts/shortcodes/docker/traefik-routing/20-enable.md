Enable Traefik for the service, and associate the service to the selected
Traefik instance:

```bash
command yq --inplace 'eval' \
  "${labels_node} |= . + {
    \"traefik.enable\": \"true\",
    \"traefik.exposed-by-instance\": \"${traefik_instance}\"
  }" "${compose_project_path}/docker-compose.yml"
```
