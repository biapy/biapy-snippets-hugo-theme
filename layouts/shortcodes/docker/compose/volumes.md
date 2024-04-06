{{/*

Declare the Compose file used volumes

Usage:

{{% docker/compose/volumes
  data="${project_name} data volume"
  config="${project_name} configuration volume"
%}}

*/}}

Declare the volumes used by this Compose file's services:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}" <<EOF
  .volumes |= . + {}
{{- range $name, $description := .Params }}
| .volumes.{{ $name }}.driver = "local"
| .volumes.{{ $name }} head_comment = "{{ $description }}"
{{- end }}
EOF
```
