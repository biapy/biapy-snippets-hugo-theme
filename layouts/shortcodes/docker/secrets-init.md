### Docker secrets {#docker-secrets-initialization}

Create the Docker stack's secrets:

```bash
while read -r 'secret_name'; do
  if [[ "${swarm_node}" = 'yes' ]]; then
    # For Swarm, use docker secret mecanism.
    command echo -n "${!secret_name}" \
        | command docker secret create "${project_name}-${secret_name}" \
        --label "com.docker.stack.namespace=${project_name}" -
  else
    # Otherwise, store secrets in local files.
    command mkdir --parent "${compose_project_path}/secrets"
    secret_file="${compose_project_path}/secrets/${secret_name}.secret"
    command echo -n "${!secret_name}" \
      > "${secret_file}"
    command chmod go-rwx "${secret_file}"
  fi
done << EOF
{{- .Inner -}}
EOF
```
