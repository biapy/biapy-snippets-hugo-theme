Deploy the stack on a standalone node:

```bash
[[ "${swarm_node}" = 'no' ]] && {
  pushd "${compose_project_path}"
  command docker-compose up --detach
  popd
}
```

Deploy the stack on a Swarm:

```bash
[[ "${swarm_node}" = 'yes' ]] && \
  command docker stack deploy \
      --compose-file "${compose_project_path}/docker-compose.yml" \
      --with-registry-auth "${project_name}"
```
