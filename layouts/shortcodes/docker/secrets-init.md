{{/*
Create the Swarm secrets or or secret files for the project:

usage: example: store the contents of a variable named ${secret_name} in ${secret_name}
file or Swarm secret:
{ {% docker/secrets-init %} }
secret_name
other_secret_name
{ {% / docker/secrets-init %} }

*/}}

### Docker secrets {#docker-secrets-initialization}

Create the secrets storage path:

```bash
command mkdir --parent "${compose_project_path}/secrets"
```

Create the Docker stack's secrets:

```bash
while read -r 'secret_name'; do
  secret_file="${compose_project_path}/secrets/${secret_name}.secret"
  command echo -n "${!secret_name}" > "${secret_file}" &&
    command chmod go-rwx "${secret_file}"
done << EOF
{{- .Inner -}}
EOF
```
