{{/*

Set a Docker Compose file service's opencontainers.org-inspired group label.

See <https://github.com/opencontainers/image-spec/blob/main/annotations.md>

Usage:

  {{% docker/compose/service/labels/group "${service_name}" "group-name" %}}

or

  {{% docker/compose/service/labels/group service="${service_name}"
    group="group-name" %}}

cSpell:ignore opencontainers

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $group := .Get "group" | default (.Get 1 | default false) -}}
{{- if or (not $service) (not $group) (ne 2 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires 'service' and 'group' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Add the `{{ $service }}` service to the `{{ $group }}` group,
using a custom grouping label the inspired by the
[Open Container Initiative](https://opencontainers.org/)'s annotations:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
with(.services.{{ $service }}.labels;
  ."org.opencontainers.container.group" = "{{ $group }}"
)
EOF
```
