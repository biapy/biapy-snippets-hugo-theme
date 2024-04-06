If this is a Docker Swarm node, set the preferred network driver to `overlay`:

```bash
[[ "${swarm_node}" = 'yes' ]] && network_driver="overlay"
```
