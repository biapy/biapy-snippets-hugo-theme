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
*/}}

{{ $networks := ( split ( .Get "networks" ) "," ) }}

Add the external networks to which this Compose file services connect:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}" <<EOF
  .networks |= . + {}
{{- range $alias, $name := .Params }}
| .networks.{{ $alias }} = { "name": "{{ $name }}", "external": true }
{{- end }}
EOF
```
