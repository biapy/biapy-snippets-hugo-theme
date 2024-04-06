Detect if the local node is standalone, or part of a swarm:

```bash
[[ "$(command docker info --format '{{ "{{" }}.Swarm.LocalNodeState}}')" =~ ^(active|locked)$ ]] && swarm_node="yes"
```
