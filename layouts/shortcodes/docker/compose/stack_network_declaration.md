{{ $name := .Get "name" }}

Add the stack network declaration:

```bash
{{ $name }}_network="${{ htmlEscape "{" }}{{ $name }}_network}" \
  network_driver="${network_driver}" \
  command yq --inplace 'eval' \
    ".networks.\"{{ $name }}\" = {
      \"name\": \"${{ htmlEscape "{" }}{{ $name }}_network}\",
      \"driver\": \"${network_driver}\",
      \"attachable\": true
    }" \
  "${compose_project_path}/docker-compose.yml"
```
