{{ $service := .Get "service" | default "${project_name}" }}

###### Restart policy {#{{ $service }}-service-restart-policy}

Configure the service to restart on failure:

```bash
if [[ "${swarm_node}" = 'no' ]]; then
  command yq --inplace 'eval' 'with(.services.{{ $service }}.restart;
    . |= "unless-stopped"
    | . line_comment="Restart the service on failure." )' \
    "${compose_project_path}/docker-compose.yml"
else
  command yq --inplace 'eval' 'with(.services.{{ $service }}.deploy.restart_policy;
    . |= {
      "condition": "any",
      "delay": "5s",
      "max_attempts": 3,
      "window": "120s"
    } | . head_comment="Restart the service on failure." )' \
    "${compose_project_path}/docker-compose.yml"
fi
```
