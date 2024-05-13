{{/*

On a standalone node, Traefik (and Watchtower) looks for the service labels.
In swarm mode, Traefik (and Shepherd) looks for the service deployment labels
(declared in the service's `deploy` section).

This shortcode declare the `${labels_node}` environment variable with the
correct `labels` YAML node to update.

Usage:

  {{% docker/compose/service/labels/labels_node "service-name" %}}

or

  {{% docker/compose/service/labels/labels_node service="service-name" %}}

cSpell:ignore Traefik

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if or (not $service) (ne 1 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Determine the `{{ $service }}` service's `labels` node placement:

```bash
labels_node=".services.{{ $service }}.labels"
[[ "${swarm_node}" = 'yes' ]] \
  && labels_node=".services.{{ $service }}.deploy.labels"
```
