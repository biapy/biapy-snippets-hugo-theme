{{/*

Declare a HTTPS router from `websecure` entrypoint on given `domain` to given
`service`.

Usage:

  {{% docker/traefik-routing/50-https-router project_name="${project_name}"
        domain="${domain}" service="${project_name}-service@docker"
        middlewares="hsts@file, security@file, compression@file"
        rule="Host(\`${domain}\`)"
        for=" for administration dashboard" %}}

*/}}
{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default "${service_name}" }}
{{ $traefik_service := .Get "traefik-service" | default ( printf "%s-%s-service@docker" $project_name $service )}}
{{ $traefik_router := printf "%s-%s-https" $project_name $service }}
{{ $middlewares := .Get "middlewares" | default "hsts@file, security@file, compression@file" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $for := .Get "for" | default "" }}
{{ $rule := .Get "rule" | default ( printf "Host(\\`%s\\`)" $domain ) }}

Add the HTTPS router{{ $for }}, exposing the service on the chosen domain:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.http.routers.{{ $traefik_router }}.entrypoints": "websecure,web",
  "traefik.http.routers.{{ $traefik_router }}.service": "{{ $traefik_service }}",
  "traefik.http.routers.{{ $traefik_router }}.rule": "{{ $rule }}",
  "traefik.http.routers.{{ $traefik_router }}.middlewares": "{{ $middlewares }}",
  "traefik.http.routers.{{ $traefik_router }}.tls": "true",
  "traefik.http.routers.{{ $traefik_router }}.tls.certresolver": "${traefik_certresolver:=default}"
}
EOF
```
