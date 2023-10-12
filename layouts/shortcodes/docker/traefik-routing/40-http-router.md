{{/*

Declare a HTTP router from `web` entrypoint on given `domain` to given
`service`, redirecting to a HTTPS connexion according to the HSTS standard.

Usage:

  {{% docker/traefik-routing/40-http-router project_name="${project_name}"
        domain="${domain}" service="${project_name}-service@docker"
        middlewares="hsts@file, https-redirect@file"
        rule="Host(\`${domain}\`)"
        for=" for administration dashboard" %}}

*/}}
{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default "${service_name}" }}
{{ $traefik_service := .Get "traefik-service" | default ( printf "%s-%s-service@docker" $project_name $service )}}
{{ $middlewares := .Get "middlewares" | default "hsts@file, https-redirect@file" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $for := .Get "for" | default "" }}
{{ $rule := .Get "rule" | default ( printf "Host(\\`%s\\`)" $domain ) }}

Add a HTTP router{{ $for }}, using a middleware to redirect to HTTPS:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.http.routers.{{ $project_name }}-http.entrypoints": "web",
  "traefik.http.routers.{{ $project_name }}-http.service": "{{ $traefik_service }}",
  "traefik.http.routers.{{ $project_name }}-http.rule": "{{ $rule }}",
  "traefik.http.routers.{{ $project_name }}-http.middlewares": "{{ $middlewares }}"
}
EOF
```
