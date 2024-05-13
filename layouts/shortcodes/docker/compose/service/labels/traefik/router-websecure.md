{{/*

Declare a HTTPS router from `websecure` entrypoint on given `domain` to given
`service`.

Usage:

  {{% docker/compose/service/labels/traefik/router-websecure
    service="service-name" %}}

or

  {{% docker/compose/service/labels/traefik/router-websecure
    service="service-name" for=" for administration dashboard"
    to="${project_name}-service-name-service@docker" %}}

or

  {{% docker/compose/service/labels/traefik/router-websecure
    service="service-name" for=" for administration dashboard"
    to="${project_name}-service-name-service@docker"
    middlewares="hsts@file,security@file,compression@file"
    domain="${domain}" rule="Host(\`${domain}\`)" %}}

cSpell:ignore traefik hsts websecure certresolver

*/}}
{{- $service := .Get "service" | default false -}}
{{- $domain := .Get "domain" | default "${domain}" -}}
{{- $for := .Get "for" | default "" -}}
{{- $middlewares := .Get "middlewares" |
  default "hsts@file,security@file,compression@file" -}}

{{- $name := .Get "name" |
  default (printf "${project_name}-%s-https" $service) -}}
{{- $to := .Get "to" |
  default (printf "${project_name}-%s-service@docker" $service) -}}
{{- $rule := .Get "rule" | default (printf "Host(\\`%s\\`)" $domain) -}}

{{- if or (not $service) (not $domain) (not $middlewares) (not $name) (not $to)
  (not $rule) (gt (.Params | len) 7) -}}
  {{-
    errorf (printf "%s %s %s"
      "The %q shortcode requires a 'service' parameter,"
      "and accept optional 'domain', 'rule', 'to', 'for', 'middlewares',"
      "and 'name' parameters. See %s")
    .Name .Position
  -}}
{{- end -}}

Add a _Traefik_ router named `{{ $name }}@docker`{{ $for }},
routing HTTPS queries to the `websecure` entrypoint matching `{{ $rule }}`
to the _Traefik_'s service named `{{ $to }}`:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"} |= . + {
  "traefik.http.routers.{{ $name }}.entrypoints": "websecure,web",
  "traefik.http.routers.{{ $name }}.service": "{{ $to }}",
  "traefik.http.routers.{{ $name }}.rule": "{{ $rule }}",
{{- if $middlewares }}
  "traefik.http.routers.{{ $name }}.middlewares": "{{ $middlewares }}",
{{- end}}
  "traefik.http.routers.{{ $name }}.tls": "true",
  "traefik.http.routers.{{ $name }}.tls.certresolver": "${traefik_certresolver:=default}"
}
EOF
```
