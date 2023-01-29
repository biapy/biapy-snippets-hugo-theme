{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default ( print $project_name "-service@docker" ) }}
{{ $middlewares := .Get "middlewares" | default "hsts@file, https-redirect@file" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $for := .Get "for" | default "" }}

Add a HTTP router{{ $for }}, using a middleware to redirect to HTTPS:

```bash
command yq --inplace 'eval' \
  "${labels_node} |= . + {
    \"traefik.http.routers.{{ $project_name }}-http.entrypoints\": \"web\",
    \"traefik.http.routers.{{ $project_name }}-http.service\": \"{{ $service }}\",
    \"traefik.http.routers.{{ $project_name }}-http.rule\": \"Host(\`{{ $domain }}\`)\",
    \"traefik.http.routers.{{ $project_name }}-http.middlewares\": \"{{ $middlewares }}\"
  }" "${compose_project_path}/docker-compose.yml"
```


