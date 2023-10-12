{{/*

On a standalone node, Traefik looks for the service labels.
In swarm mode, Traefik looks for the service deployment labels (declared in
the service's `deploy` section.

This shortcode declare the `labels_node` environment variable with the correct
`labels` YAML node to update.

Usage:

  {{% docker/traefik-routing/10-indent service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${service_name}" }}

Determine the `labels` node placement:

```bash
labels_node=".services.{{ $service }}.labels"
[[ "${swarm_node}" = 'yes' ]] \
  && labels_node=".services.{{ $service }}.deploy.labels"
```
