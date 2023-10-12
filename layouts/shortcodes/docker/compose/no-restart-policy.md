{{/*

Either:

- set the service `restart` to `no` for a standalone Docker node.
- set the `restart_policy` condition to `none` for a Docker swarm.

Usage:

{{% docker/compose/no-restart-policy service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${project_name}" }}

###### Restart policy {#{{ $service }}-service-restart-policy}

Disable the service restart policy (a scheduler run the service):

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }};
  .restart = "no"
  .deploy.restart_policy.condition: "none"
)
EOF
fi
```
