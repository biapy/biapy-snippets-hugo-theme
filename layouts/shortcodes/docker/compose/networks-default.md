{{/*

Declare the Compose file default network

Usage:

  {{% docker/compose/networks-default %}}

  Set network name:

  {{% docker/compose/networks-default name="${project_name}-net" %}}

  Set network driver:

  {{% docker/compose/networks-default name="${project_name}-net"
        driver="${network_driver:-bridge}" %}}

  Set static subnet:

  {{% docker/compose/networks-default name="${project_name}-net"
        subnet="172.0.34.0/24" %}}

cSpell:ignore ipam

*/}}

{{ $name := .Get "name" | default "${project_name}-net" }}
{{ $driver := .Get "driver" | default "${network_driver:-bridge}" }}
{{ $subnet := .Get "subnet" }}

Set the default network name, and configure it to accept external containers:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
with(.networks.default;
    .name = "{{ $name }}"
  | .driver = "{{ $driver }}"
  | .attachable = true
{{- if $subnet }}
  | .ipam.config = [{ "subnet": "{{ $subnet }}" }]
{{- end }}
)
EOF
```
