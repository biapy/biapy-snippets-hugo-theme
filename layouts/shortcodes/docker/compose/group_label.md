{{ $service := .Get "service" | default "${project_name}" }}
{{ $group := .Get "group" }}

Add the service to the `{{ $group }}` group:

```bash
command yq --inplace 'eval' \
  ".services.{{ $service }}.labels.\"org.label-schema.group\" = \"{{ $group }}\"" \
  "${compose_project_path}/docker-compose.yml"
```
