{{/*

Set the service CPU restrictions.

Usage:

{{% docker/compose/service/cpus "${service_name}" "0.5" %}}

@see [Resource constraints](https://docs.docker.com/engine/containers/resource_constraints/).
@see [cpus @ Services top-level elements](https://docs.docker.com/reference/compose-file/services/#cpus).

<!-- cSpell:ignore cpus -->

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $cpus := .Get "cpus" | default (.Get 1 | default false) -}}
{{- if or (not $service) (not $cpus) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' name and a 'cpus' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Set the `{{ $service }}` service's CPU limits:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.cpus = {{ $cpus }}
EOF
```
