{{/*

Define a basic auth middleware requiring visitors to login using a username
and password before accessing the published service.

Usage:

  {{% docker/compose/service/labels/traefik/middlewares-basicauth
    service="service-name" %}}

or:

  {{% docker/compose/service/labels/traefik/middlewares-basicauth
    service="service-name" users="${http_htpasswd//\\$/\\$\\$}}" %}}

or:

  {{% docker/compose/service/labels/traefik/middlewares-basicauth
    service="service-name" name="${project_name}-service-name-auth"
    realm="${domain}" users="${http_htpasswd//\\$/\\$\\$}}" %}}

cSpell:ignore traefik basicauth htpasswd

*/}}
{{- $service := .Get "service" | default false -}}
{{- $realm := .Get "realm" | default "${domain}" -}}
{{- $users := .Get "users" | default "${http_htpasswd//\\$/\\$\\$}" -}}
{{- $name := .Get "name" |
  default (printf "${project_name}-%s-auth" $service) -}}

{{- if or (not $service) (not $name) (not $realm) (not $users)
  (gt (.Params | len) 4) -}}
  {{-
    errorf (printf "%s %s"
      "The %q shortcode requires a 'service' parameter,"
      "and accept optional 'name', 'realm', and 'users' parameters. See %s")
    .Name .Position
  -}}
{{- end -}}

Setup a basic HTTP authentication _Traefik_ middleware named
`{{ $name }}@docker`,
restricting access to `{{ $service }}` with a username and password:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"} |= . + {
  "traefik.http.middlewares.{{ $name }}.basicauth.realm": "{{ $realm }}",
  "traefik.http.middlewares.{{ $name }}.basicauth.users": "{{ $users }}"
}
EOF
```
