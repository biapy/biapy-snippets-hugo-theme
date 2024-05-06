{{/*

Assign networks to a service in a Compose file.

Usage:

  {{% docker/compose/service/networks "${service_name}" "default" "traefik"
    "mariadb" "postgres" "prometheus" %}}

or

  {{% docker/compose/service/networks service="${service_name}"
    networks="default traefik mariadb postgres prometheus" %}}

cSpell:ignore traefik mariadb postgres prometheus

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $networks := slice -}}
{{- if .IsNamedParams -}}
  {{- $networks = ( collections.Apply
    (strings.Split ( .Get "networks" | default "" ) " ")
    "strings.Trim" "." " \t\r\n" ) | complement (slice "")
  -}}
{{- else -}}
  {{- $networks = collections.After 1 .Params -}}
{{- end -}}
{{- if or (not $service) (not $networks) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' name and a 'networks' list. See %s"
    .Name .Position
  -}}
{{- end -}}

Attach the `{{ $service }}` service to its networks:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .services.{{ $service }}.networks |= . + {}
{{- range $network := $networks }}
| .services.{{ $service }}.networks.{{ $network }} = {}
{{- end }}
EOF
```
