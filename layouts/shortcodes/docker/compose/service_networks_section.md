{{ $service := .Get "service" | default "${project_name}" }}
{{ $networks := ( split ( .Get "networks" ) "," ) }}

{{ if ne ( .Get "networks" ) "" }}

Add the service to its networks, if known:

```bash
while read -r 'name'; do
  network_name_var="${name}_network"
  [[ -n "${!network_name_var}" ]] && \
    command yq --inplace 'eval' \
    ".services.{{ $service }}.networks.\"${name}\" |= {}" \
  "${compose_project_path}/docker-compose.yml"
done {{ safeHTML "<<" }} EOF
{{- range $network := $networks }}
{{ $network }}
{{- end }}
EOF
```

{{ end }}
