{{/*

Declare the Compose file's used configuration files

Usage:

{{% docker/compose/configs "./etc/example.ini" "./etc/example.yaml" %}}

*/}}
{{- if or .IsNamedParams (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least one unnamed parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the configuration files this Compose file's services use:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .configs |= . + {}
{{- range $file := .Params }}
| .configs."{{ path.Base $file }}".file = "{{ $file }}"
{{- end }}
EOF
```
