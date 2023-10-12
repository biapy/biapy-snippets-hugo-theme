{{/*

Add a constraint forcing the service to run on a Docker Swarm manager node.
Check that the node have `node.role` set to `"manager"`.

Usage:

{{% docker/compose/manager_node_constraint service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${project_name}" }}

Constrains the service to run on manager nodes if deployed on a Docker swarm:

```bash
[[ "${swarm_node}" = 'yes' ]] &&
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
  .services.{{ $service }}.deploy.placement.constraints |= . + []
| with(.services.{{ $service }}.deploy.placement.constraints
  | select( any_c( . == "node.role == manager" ) | not );
      . |= . + [ "node.role == manager" ]
    | . head_comment="Requires the service to run on a manager node,
where access to the Swarm API is available."
)
EOF
```
