{{ $service := .Get "service" | default "${project_name}" }}

Constrains the service to run on manager nodes if deployed on a Docker swarm:

```bash
if [[ "${swarm_node}" = 'yes' ]];
  command yq --inplace 'eval' \
    '.services.{{ $service }}.deploy.placement.constraints |= . + []' \
    "${compose_project_path}/docker-compose.yml"
  command yq --inplace 'eval' \
    "with(.services.{{ $service }}.deploy.placement.constraints
      | select( any_c( . == \"node.role == manager\" ) | not) ;
      . |= . + [ \"node.role == manager\" ]
      | . head_comment=\"Since the Swarm API is only exposed on manager nodes,
the service needs to run on a manager node.\" )" \
    "${compose_project_path}/docker-compose.yml"
fi
```
