{{/*

Add a constraint forcing the service to run on a node having the
`node.labels.${project_name}.data` label set to `"true"`.

Usage:

{{% docker/compose/local_volume_constraint service="service-name" %}}

*/}}
{{ $service := .Get "service" | default "${service_name}" }}

Unless a distributed volume is setup, constrains the service container
to the node storing its data volume:

```bash
[[ "${swarm_node}" = 'yes' ]] &&
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
  .services.{{ $service }}.deploy.placement.constraints |= . + []
| with(.services.{{ $service }}.deploy.placement.constraints
    | select( any_c( . == "node.labels.${project_name}.data == true" ) | not) ;
        . |= . + [ "node.labels.${project_name}.data == true" ]
      | . head_comment="Contrains container to the node storing its data."
  )
EOF
```
