{{/*

Set the service number of replicas to 0 for Docker swarm.

Usage:

{{% docker/compose/no-replicas service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${project_name}" }}

Disable the service deployment, a scheduler manage the service:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }}.deploy;
    .mode = "replicated"
  | .replicas = 0
)
EOF
fi
```
