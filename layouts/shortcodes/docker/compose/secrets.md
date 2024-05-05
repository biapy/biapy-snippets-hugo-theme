{{/*

Declare the Compose file used secrets

Usage:

{{% docker/compose/secrets
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

*/}}
{{- if (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least one parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the secrets this Compose file's services use:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}" <<EOF
  .secrets |= . + {}
{{- range $name := .Params }}
| .secrets.{{ $name }}.file = "secrets/{{ $name }}.secret"
{{- end }}
EOF
```
