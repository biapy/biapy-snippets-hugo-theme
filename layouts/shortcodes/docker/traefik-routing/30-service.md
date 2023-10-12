{{/*

Declare the service available for exposure by the Traefik instance named
`${traefik_instance}` (namely the port and its protocol scheme available for
publication in the docker instance).

Usage:

  {{% docker/traefik-routing/30-service name="software's"
        port="443" scheme="https"
        transport="tls-skip-verify@file" project_name="${project_name}" %}}

`transport` is optional.

*/}}
{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default "${service_name}" }}
{{ $name := .Get "name" | default $service }}
{{ $traefik_service := .Get "traefik-service" | default ( printf "%s-%s-service" $project_name $service )}}
{{ $port := .Get "port" | default "80" }}
{{ $scheme := .Get "scheme" | default "http" }}
{{ $transport := .Get "transport" }}

Declare the {{ $name }} service:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.http.services.{{ $traefik_service }}.loadbalancer.server.port": {{ $port }},
  "traefik.http.services.{{ $traefik_service }}.loadbalancer.server.scheme": "{{ $scheme }}"
{{- if $transport }},
  "traefik.http.services.{{ $traefik_service }}.loadbalancer.serversTransport": "{{ $transport }}"
{{- end }}
}
EOF
```
