{{/*

Declare a HTTPS router from `administration` entrypoint on given `domain` to given
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
{{ $middlewares := .Get "middlewares" | default "hsts@file, security@file, compression@file" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $for := .Get "for" | default "" }}
{{ $rule := .Get "rule" | default ( printf "Host(\\`%s\\`)" $domain ) }}

Add the HTTPS administration router{{ $for }}, exposing the service on the
chosen domain via SSH tunneling:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.http.routers.{{ $project_name }}-{{ $service }}-administration.entrypoints": "administration",
  "traefik.http.routers.{{ $project_name }}-{{ $service }}-administration.service": "{{ $traefik_service }}",
  "traefik.http.routers.{{ $project_name }}-{{ $service }}-administration.rule": "{{ $rule }}",
  "traefik.http.routers.{{ $project_name }}-{{ $service }}-administration.middlewares": "{{ $middlewares }}",
  "traefik.http.routers.{{ $project_name }}-{{ $service }}-administration.tls": "true"
}
EOF
```
