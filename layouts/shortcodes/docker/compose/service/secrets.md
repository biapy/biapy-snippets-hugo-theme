{{/*

Assign secrets to a service in a Compose file.

Usage:

  {{% docker/compose/service/secrets "${service_name}"
    "http_username" "http_password"
    "db_username" "db_password"
    "${project_name}-ssl-key" "${project_name}-ssl-cert"
  %}}

or

  {{% docker/compose/service/secrets service="${service_name}"
    secrets="http_username http_password db_username db_password" %}}

or

  <!-- markdownlint-disable MD013 line-length -->
  {{% docker/compose/service/secrets service="${service_name}"
    secrets="http_username,http_password,db_username,db_password,${project_name}-ssl-key,${project_name}-ssl-cert"
  %}}
  <!-- markdownlint-enable MD013 line-length -->

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $secrets := slice -}}
{{- if .IsNamedParams -}}
  {{- $secrets = ( collections.Apply
    ( strings.Split
      ( strings.Replace ( .Get "secrets" | default "" ) "," " " )
      " "
    )
    "strings.Trim" "." " \t\r\n" ) | complement ( slice "" )
  -}}
{{- else -}}
  {{- $secrets = collections.After 1 .Params -}}
{{- end -}}
{{- if or (not $service) (not $secrets) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' name and a 'secrets' list. See %s"
    .Name .Position
  -}}
{{- end -}}

Reveal its _Docker_ secrets to the `{{ $service }}` service
(store the secrets as files in the container's `/run/secrets` folder):

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.secrets |= . + [
{{- $firstLoop := true }}
{{- range $secret := $secrets }}
  {{- if not $firstLoop -}} , {{- end }}
  "{{ $secret }}"
  {{- $firstLoop = false }}
{{- end }}
]
EOF
```
