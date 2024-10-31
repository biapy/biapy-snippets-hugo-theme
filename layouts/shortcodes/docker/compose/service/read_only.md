{{/*

Set a service container's filesystem as readonly.

Usage:

{{% docker/compose/service/read_only "${service_name}" %}}

or

{{% docker/compose/service/read_only service="${service_name}"

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if not $service -}}
  {{-
    errorf (printf "%s %s"
      "The %q shortcode requires a 'service' parameter."
      "See %s"
    ) .Name .Position
  -}}
{{- end -}}

Disable writing to the `{{ $service }}` service's container's filesystem:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.read_only = true
EOF
```
