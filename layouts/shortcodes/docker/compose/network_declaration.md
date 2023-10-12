{{ $networks := ( split ( .Get "networks" ) "," ) }}

Add the known networks:

```bash
while read -r 'name'; do
  network_name_var="${name}_network"
  [[ -n "${!network_name_var}" ]] && \
    command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
with(.networks.${name};
  .name = "${!network_name_var}"
  | .external = true
)
EOF
done {{ safeHTML "<<" }} EOF
{{- range $network := $networks }}
{{ $network }}
{{- end }}
EOF
```
