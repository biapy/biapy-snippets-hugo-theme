{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $realm := .Get "realm" | default "${domain}" }}
{{ $users := .Get "users" | default "${http_htpasswd//\\$/\\$\\$}" }}
Describe the basic auth middleware, used to ask visitors for login credentials
when accessing the software:

```bash
command yq --inplace 'eval' \
  "${labels_node} |= . + {
     \"traefik.http.middlewares.{{ $project_name }}-auth.basicauth.realm\": \"{{ $realm }}\",
    \"traefik.http.middlewares.{{ $project_name }}-auth.basicauth.users\": \"{{ $users }}\"
  }" "${compose_project_path}/docker-compose.yml"
```
