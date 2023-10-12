{{/*

Either:

- set the service `restart` to `unless-stopped` for a standalone Docker node.
- set the `restart_policy` to restart the service 3 times separated by a 5s
  delay when the healthcheck fails.

Usage:

{{% docker/compose/restart_policy service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${service_name}" }}

###### Restart policy {#{{ $service }}-service-restart-policy}

Configure the service to restart on failure:

```bash
if [[ "${swarm_node}" = 'no' ]]; then
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }}.restart;
    . |= "unless-stopped"
  | . line_comment="Restart the service on failure."
)
EOF
else
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }}.deploy.restart_policy;
    . |= {
      "condition": "any",
      "delay": "5s",
      "max_attempts": 3,
      "window": "120s"
    }
  | . head_comment="Restart the service on failure."
)
EOF
fi
```
