Detect if the local node is standalone, or part of a swarm:

```bash
swarm_node="no"
[[ "$(command docker info --format '{{ "{{" }}.Swarm.LocalNodeState}}')" =~ ^(active|locked)$ ]] && swarm_node="yes"
```
