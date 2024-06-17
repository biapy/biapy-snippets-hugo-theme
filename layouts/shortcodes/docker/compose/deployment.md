{{/*

Display the deployment command for the docker file.

Usage:

{{% docker/compose/deployment %}}

or

{{% docker/compose/deployment "no" %}}

or

{{% docker/compose/deployment swarm="no" %}}

*/}}
{{ $swarm := .Get "swarm" | default ( .Get 0 | default "yes" ) }}

Deploy the stack on a standalone node:

```bash
[[ "${swarm_node}" != 'yes' ]] &&
  command docker compose --file "${compose_file}" 'up' --detach
```

{{ if eq $swarm "yes"  -}}

Deploy the stack on a Swarm cluster:

```bash
[[ "${swarm_node}" = 'yes' ]] &&
  command docker stack deploy --compose-file "${compose_file}" \
      --with-registry-auth "${project_name}"
```

{{ end -}}
