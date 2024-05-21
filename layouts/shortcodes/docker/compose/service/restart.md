{{/*

Either:

- set the service `restart` to `unless-stopped` for a standalone Docker node.
- set the `restart_policy` to restart the service 3 times separated by a 5s
  delay when the health check fails.

Usage:

{{% docker/compose/service/restart "service-name" %}}

or:

{{% docker/compose/service/restart service="service-name" %}}

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if not $service -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' name. See %s"
    .Name .Position
  -}}
{{- end -}}

Configure the `{{ $service }}` service to restart in case of failure:

```bash
[[ "${swarm_node}" != 'yes' ]] &&
  {{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.restart = "unless-stopped"
EOF
[[ "${swarm_node}" = 'yes' ]] &&
  {{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.deploy.restart_policy= {
  "condition": "any", "delay": "5s", "max_attempts": 3, "window": "120s"
}
EOF
```
