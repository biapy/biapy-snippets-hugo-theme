
### Local volume constraint

Unless a distributed volume is setup, add a label to the local node
signaling that it stores the data (in a local Docker volume):

```bash
[[ "${swarm_node}" = 'yes' ]] && \
  command docker node update --label-add "${project_name}.data=true" \
    "$(command docker info --format '{{ htmlEscape "{" }}{.Swarm.NodeID}}')"
```
