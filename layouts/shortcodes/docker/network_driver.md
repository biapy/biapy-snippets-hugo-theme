Determine the preferred network driver:

```bash
network_driver="bridge"
[[ "${swarm_node}" = 'yes' ]] && network_driver="overlay"
```
