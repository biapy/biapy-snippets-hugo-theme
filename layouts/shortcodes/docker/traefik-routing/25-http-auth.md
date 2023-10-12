{{/*

Define a basic auth middleware requiring visitors to login using a username
and password before accessing the published service.

Usage:

  {{% docker/traefik-routing/25-http-auth project_name="${project_name}"
        realm="${domain}" users="${http_htpasswd//\\$/\\$\\$}}" %}}

*/}}
{{ $project_name := .Get "project_name" | default "${project_name}" }}
{{ $service := .Get "service" | default "${service_name}" }}
{{ $realm := .Get "realm" | default "${domain}" }}
{{ $users := .Get "users" | default "${http_htpasswd//\\$/\\$\\$}" }}
Describe the basic auth middleware, used to ask visitors for login credentials
when accessing the software:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.http.middlewares.{{ $project_name }}-{{ $service }}-auth.basicauth.realm": "{{ $realm }}",
  "traefik.http.middlewares.{{ $project_name }}-{{ $service }}-auth.basicauth.users": "{{ $users }}"
}
EOF
```
