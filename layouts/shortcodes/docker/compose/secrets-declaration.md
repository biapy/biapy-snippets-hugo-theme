#### Secrets

Declare the Docker secrets used by the stack

```bash
while read -r 'secret_name'; do
  if [[ "${swarm_node}" = 'yes' ]]; then
    # For Swarm, declare the secret as external.
    command yq --inplace 'eval' \
      ".secrets.${project_name}-${secret_name} =
        { \"external\" : true }" \
      "${compose_project_path}/docker-compose.yml"
  else
    # Otherwise, the secret is stored in a file.
    command yq --inplace 'eval' \
      ".secrets.${project_name}-${secret_name} =
        { \"file\" : \"secrets/${secret_name}.secret\" }" \
      "${compose_project_path}/docker-compose.yml"
  fi
done << EOF
{{- .Inner -}}
EOF
```
