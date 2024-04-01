{{/*

Adds networks configuration to a `docker-compose.yml`` service.

Usage:

{ {% docker/compose/service_networks_section service="<service-name>"
  networks="<service-network-name>,mariadb,prometheus" %} }

*/}}
{{ $service := .Get "service" | default "${project_name}" }}
{{ $networks := ( split ( .Get "networks" ) "," ) }}

{{ if ne ( .Get "networks" ) "" }}

###### Networks {#{{ $service }}-service-networks}

Add the service to its networks, if known:

```bash
while read -r 'name'; do
  network_name_var="${name}_network"
  [[ -n "${!network_name_var}" ]] &&
    command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
.services.{{ $service }}.networks."${name}" |= {}
EOF
done {{ safeHTML "<<" }} EOF
{{ range $network := $networks -}}
{{ $network }}
{{ end -}}
EOF
```

{{ end }}
