Deploy the stack on a standalone node:

```bash
[[ "${swarm_node}" = 'no' ]] &&
  command docker 'compose' \
    --file "${compose_project_path}/docker-compose.yml" \
    'up' --detach
```

Deploy the stack on a Swarm:

```bash
[[ "${swarm_node}" = 'yes' ]] &&
  command docker stack deploy \
      --compose-file "${compose_project_path}/docker-compose.yml" \
      --with-registry-auth "${project_name}"
```
