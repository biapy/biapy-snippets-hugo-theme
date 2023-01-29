{{ $service := .Get "service" | default "${project_name}" }}

Unless a distributed volume is setup, constrains the service container
to the node storing its data volume:

```bash
[[ "${swarm_node}" = 'yes' ]] && \
  command yq --inplace 'eval' \
    ".services.{{ $service }}.deploy.placement.constraints |= . + []
    | with(.services.{{ $service }}.deploy.placement.constraints
      | select( any_c( . == \"node.labels.${project_name}.data == true\" ) | not) ;
      . |= . + [ \"node.labels.${project_name}.data == true\" ]
      | . head_comment=\"Contrains container to the node storing its data.\"
    )" \
    "${compose_project_path}/docker-compose.yml"
```
