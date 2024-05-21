{{/*

Assign volumes to a service in a Compose file.

Usage:

  {{% docker/compose/service/volumes "${service_name}" %}}
  ${service_name}-data:/app/var
  ${service_name}-config:/app/config:ro
  ./etc:/app/etc
  {{% / docker/compose/service/volumes%}}

or

  {{% docker/compose/service/volumes service="${service_name}"
    timezone="false" %}}
  ${service_name}-data:/app/var
  ${service_name}-config:/app/config:ro
  ./etc:/app/etc
  {{% / docker/compose/service/volumes%}}

cSpell:ignore localtime

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $timezone := eq "true" (.Get "timezone" | default "true") -}}
{{- $volumes := ( collections.Apply
    (strings.Split ( .Inner | default "" ) "\n")
    "strings.Trim" "." " \t\r\n" ) | complement (slice "")
  -}}
{{- if not $service -}}
  {{-
    errorf
    "The %q shortcode requires at least a 'service' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare mount points of the `{{ $service }}` service's volumes:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.volumes |= . + [
{{- if $timezone }}
  "/etc/timezone:/etc/timezone:ro",
  "/etc/localtime:/etc/localtime:ro",
{{- end }}
{{- $firstVolume := true }}
{{- range $volume := $volumes }}
  {{- if not $firstVolume -}} , {{- end }}
  "{{ $volume }}"
  {{- $firstVolume = false }}
{{- end }}
]
EOF
```
