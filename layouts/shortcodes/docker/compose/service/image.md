{{/*

Set a Docker Compose file service's image.

Usage:

  {{% docker/compose/service/image "${service_name}" "project/image:latest" %}}

or

  {{% docker/compose/service/image service="${service_name}"
    image="project/image:latest" %}}

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $image := .Get "image" | default (.Get 1 | default false) -}}
{{- if or (not $service) (not $image) (ne 2 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires 'image' and 'service' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Set `{{ $service }}` service's image:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.image = "{{ $image }}"
EOF
```
