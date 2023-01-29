{{ $service := .Get "service" | default "${project_name}" }}

Determine the Traefik's `labels:` placement:

```bash
labels_node='.services.{{ $service }}.labels'
[[ "${swarm_node}" = 'yes' ]] \
  && labels_node='.services.{{ $service }}.deploy.labels'
```
