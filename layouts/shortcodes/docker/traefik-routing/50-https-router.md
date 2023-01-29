{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default ( print $project_name "-service@docker" ) }}
{{ $middlewares := .Get "middlewares" | default "hsts@file, security@file, compression@file" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $for := .Get "for" | default "" }}
{{ $rule := .Get "rule" | default ( printf "Host(\\`%s\\`)" $domain ) }}

Add the HTTPS router{{ $for }}, exposing the service on the chosen domain:

```bash
command yq --inplace 'eval' \
  "${labels_node} |= . + {
      \"traefik.http.routers.{{ $project_name }}-https.entrypoints\": \"websecure\",
      \"traefik.http.routers.{{ $project_name }}-https.service\": \"{{ $service }}\",
      \"traefik.http.routers.{{ $project_name }}-https.rule\": \"{{ $rule }}\",
      \"traefik.http.routers.{{ $project_name }}-https.middlewares\": \"{{ $middlewares }}\",
      \"traefik.http.routers.{{ $project_name }}-https.tls\": \"true\",
      \"traefik.http.routers.{{ $project_name }}-https.tls.certresolver\": \"${traefik_certresolver:=default}\"
  }" "${compose_project_path}/docker-compose.yml"
```
