{{/*

Declare the Compose file used volumes

Usage:

{{% docker/compose/volumes
  data="${project_name} data volume"
  config="${project_name} configuration volume"
%}}

*/}}
{{- if or (not .IsNamedParams) (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least one named parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the volumes used by this Compose file's services:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .volumes |= . + {}
{{- range $name, $description := .Params }}
| .volumes.{{ $name }}.driver = "local"
| .volumes.{{ $name }} head_comment = "{{ $description }}"
{{- end }}
EOF
```
