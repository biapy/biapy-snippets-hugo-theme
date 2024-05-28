{{/*

Generate a locally trusted certificate using mkcert,
and store it in Docker Compose project's secrets folder.

Usage:

{{% docker/secrets-mkcert key="software-code-ssl-key"
  cert="software-code-ssl-cert"
  host="${domain} software-code localhost" %}}

or, with a custom description:

{{% docker/secrets-mkcert description="Create the service's SSL certificate:"
  key="software-code-ssl-key" cert="software-code-ssl-cert"
  host="${domain} software-code localhost" %}}

*/}}
{{- $key := .Get "key" | default false -}}
{{- $cert := .Get "cert" | default false -}}
{{- $hosts := ( collections.Apply
  (strings.Split ( .Get "hosts" | default "" ) " ")
  "strings.Trim" "." " \t\r\n" ) | complement (slice "")
-}}
{{- if or (not $cert) (not $key) -}}
  {{-
    errorf
    "The %q shortcode requires 'key' and 'cert' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}
{{- if not $hosts -}}
  {{-
    errorf
    "The %q shortcode requires at least one domain in 'hosts' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

{{ with .Get "description" -}}
{{ . }}
{{- else -}}
Use `mkcert` to create a locally signed SSL/TLS certificate to encrypt
communications over Docker's networks:
{{- end }}

```bash
command mkdir --parent "${compose_project_path}/secrets" &&
command mkcert -key-file="${compose_project_path}/secrets/{{ $key }}.secret" \
  -cert-file="${compose_project_path}/secrets/{{ $cert }}.secret" \
 {{ range $host := $hosts }} "{{ $host }}"{{ end }}
```
