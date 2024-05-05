{{/*

Declare the Compose file used secrets

Usage:

{{% docker/compose/secrets
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

*/}}
{{- if or .IsNamedParams (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least one unnamed parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the secrets this Compose file's services use:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .secrets |= . + {}
{{- range $name := .Params }}
| .secrets.{{ $name }}.file = "secrets/{{ $name }}.secret"
{{- end }}
EOF
```
