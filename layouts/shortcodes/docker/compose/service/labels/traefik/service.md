{{/*

Declare the service available for exposure by the Traefik instance
(namely the port and its protocol scheme available for
publication in the docker instance).

Usage:

  {{% docker/compose/service/labels/traefik/service service="service-name"
    port="80" scheme="http" %}}

or

  {{% docker/compose/service/labels/traefik/service service="service-name"
    port="443" scheme="https" transport="tls-skip-verify@file" %}}

or

  {{% docker/compose/service/labels/traefik/service service="service-name"
    port="443" scheme="https" transport="tls-skip-verify@file"
    name="${project_name}-service-name-service" %}}

cSpell:ignore traefik loadbalancer

*/}}
{{- $service := .Get "service" | default false -}}
{{- $scheme := .Get "scheme" | default false -}}
{{- $port := .Get "port" | default false -}}
{{- $transport := .Get "transport" | default false -}}
{{- $name := .Get "name" |
  default (printf "${project_name}-%s-service" $service) -}}

{{- if or (not $service) (not $scheme) (not $port) (not $name)
  (gt (.Params | len) 5) -}}
  {{-
    errorf (printf "%s %s"
      "The %q shortcode requires 'service', 'scheme', and 'port parameters,"
      "and accept optional 'name' and 'transport' parameters. See %s")
    .Name .Position
  -}}
{{- end -}}

Declare a _Traefik_ service named `{{ $name }}@docker`,
exposing `{{ $scheme }}://{{ $service }}:{{ $port }}/` to the world
{{- if $transport }},
using `{{ $transport }}` transport
{{- end }}:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"} |= . + {
  "traefik.http.services.{{ $name }}.loadbalancer.server.port": {{ $port }},
  "traefik.http.services.{{ $name }}.loadbalancer.server.scheme": "{{ $scheme }}"
{{- if $transport }},
  "traefik.http.services.{{ $name }}.loadbalancer.serversTransport": "{{ $transport }}"
{{- end }}
}
EOF
```
