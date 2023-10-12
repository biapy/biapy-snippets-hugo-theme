{{ $project_name := .Get "name" | default "${project_name}" }}
{{ $subnet := .Get "subnet" | default "" }}

Add the stack network declaration:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
with(.networks.default;
    .name = "{{ $project_name }}-net"
  | .driver = "${network_driver}"
  | .attachable = true
{{- if ne $subnet "" }}
  | .ipam.config = [{
        "subnet": "{{ $subnet }}"
      }]
{{- end }}
)
EOF
```
