{{/*
Add to docker-compose.yml file the declaration of secrets used by the stack

usage: example for a secret named "${project_name}-${secret_name}:
{ {% docker/compose/secrets-declaration %} }
secret_name
{ {% / docker/compose/secrets-declaration %} }

Old code:

```bash
  if [[ "${swarm_node}" = 'yes' ]]; then
    # For Swarm, declare the secret as external.
    command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
.secrets.${project_name}-${secret_name}.external = true
EOF
fi
```

*/}}

#### Secrets declaration

Declare the Docker secrets used by the stack

```bash
while read -r 'secret_name'; do
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
.secrets."${secret_name}".file = "secrets/${secret_name}.secret"
EOF
done << EOF
{{- .Inner -}}
EOF
```
