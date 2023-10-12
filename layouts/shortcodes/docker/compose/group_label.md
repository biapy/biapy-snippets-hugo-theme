{{ $service := .Get "service" | default "${service_name}" }}
{{ $group := .Get "group" }}

Add the service to the `{{ $group }}` group:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
.services.{{ $service }}.labels."org.label-schema.group" = "{{ $group }}"
EOF
```
