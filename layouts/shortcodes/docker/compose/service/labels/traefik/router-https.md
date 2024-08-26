{{/*

Declare a HTTPS router from given `entrypoint` on given `domain`
to given `service`.

Usage:

  {{% docker/compose/service/labels/traefik/router-https
    service="service-name" entrypoint="administration" %}}

or

  {{% docker/compose/service/labels/traefik/router-https
    service="service-name" entrypoint="administration"
    for=" for administration dashboard"
    certresolver="${traefik_certresolver:=default}"
    to="${project_name}-service-name-service@docker" %}}

or

  {{% docker/compose/service/labels/traefik/router-https
    service="service-name" entrypoint="administration"
    for=" for administration dashboard"
    to="${project_name}-service-name-service@docker"
    middlewares="hsts@file,security@file,compression@file"
    certresolver="${traefik_certresolver:=default}"
    domain="${domain}" rule="Host(\`${domain}\`)" %}}

cSpell:ignore traefik hsts certresolver

*/}}
{{- $service := .Get "service" | default false -}}
{{- $entrypoint := .Get "entrypoint" | default false -}}
{{- $certresolver := .Get "certresolver" | default false -}}
{{- $domain := .Get "domain" | default "${domain}" -}}
{{- $for := .Get "for" | default "" -}}
{{- $middlewares := .Get "middlewares" |
  default "hsts@file,security@file,compression@file" -}}

{{- $name := .Get "name" |
  default (printf "${project_name}-%s-%s" $service $entrypoint) -}}
{{- $to := .Get "to" |
  default (printf "${project_name}-%s-service@docker" $service) -}}
{{- $rule := .Get "rule" | default (printf "Host(`%s`)" $domain) -}}

{{- if or (not $service) (not $entrypoint) (not $domain) (not $middlewares)
  (not $name) (not $to) (not $rule) (gt (.Params | len) 7) -}}
  {{-
    errorf (printf "%s %s %s"
      "The %q shortcode requires 'service' and 'entrypoint' parameters,"
      "and accept optional 'domain', 'rule', 'to', 'for', 'middlewares',"
      "'certresolver', and 'name' parameters. See %s")
    .Name .Position
  -}}
{{- end -}}

Add a _Traefik_ router named `{{ $name }}@docker`{{ $for }},
routing HTTPS queries to the `{{ $entrypoint }}` entrypoint matching
``{{ $rule }}`` to the _Traefik_'s service named `{{ $to }}`,
exposing the service to access via SSH tunneling:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"} |= . + {
  "traefik.http.routers.{{ $name }}.entrypoints": "{{ $entrypoint }}",
  "traefik.http.routers.{{ $name }}.service": "{{ $to }}",
  "traefik.http.routers.{{ $name }}.rule": "{{ replace $rule "`" "\\`" }}",
{{- if $middlewares }}
  "traefik.http.routers.{{ $name }}.middlewares": "{{ $middlewares }}",
{{- end}}
  "traefik.http.routers.{{ $name }}.tls": "true"
{{- if $certresolver }}
  "traefik.http.routers.{{ $name }}.tls.certresolver": "{{ $certresolver }}"
{{- end}}
}
EOF
```
