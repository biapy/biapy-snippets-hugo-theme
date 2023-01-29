{{ $name := .Get "name" | default "" }}
{{ $port := .Get "port" }}
{{ $scheme := .Get "scheme" | default "http" }}
{{ $transport := .Get "transport" }}
{{ $project_name := .Get "project_name" | default "${project_name}" }}

Declare the {{ $name }} service:

```bash
command yq --inplace 'eval' \
  "${labels_node} |= . + {
    \"traefik.http.services.{{ $project_name }}-service.loadbalancer.server.port\": {{ $port }},
    \"traefik.http.services.{{ $project_name }}-service.loadbalancer.server.scheme\": \"{{ $scheme }}\"
{{- if $transport }},
    \"traefik.http.services.{{ $project_name }}-service.loadbalancer.serversTransport\": \"{{ $transport }}\"
{{- end }}
  }" "${compose_project_path}/docker-compose.yml"
```
