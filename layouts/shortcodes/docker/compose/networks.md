{{/*

Declare the Compose file external networks

Usage:

{{% docker/compose/networks
  traefik="traefik-net"
  mariadb="mariadb-net"
  postgres="postgres-net"
  prometheus="prometheus-net"
%}}

or:

{{% docker/compose/networks
  traefik="${traefik_network:-traefik-net}"
  mariadb="${mariadb_network:-mariadb-net}"
  postgres="${postgres_network:-postgres-net}"
  prometheus="${prometheus_network:-prometheus-net}"
%}}

cSpell:ignore traefik mariadb postgres prometheus

*/}}
{{- if or (not .IsNamedParams) (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least one parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the external networks this Compose file's services connect to:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .networks |= . + {}
{{- range $alias, $name := .Params }}
| .networks.{{ $alias }} = { "name": "{{ $name }}", "external": true }
{{- end }}
EOF
```
