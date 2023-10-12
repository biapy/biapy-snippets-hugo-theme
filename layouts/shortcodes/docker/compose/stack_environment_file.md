{{/*
Add or update a service env_file configuration. Add missing env files to
the env_file array.

usage:
  { {% docker/compose/stack_environment_file %} }
or with options:
  { {% docker/compose/stack_environment_file service="${service_name}"
    name="${service}" envfile="./env/${name}.env" %} }
*/}}
{{ $service := .Get "service" | default "${service_name}" }}
{{ $name := .Get "name" | default $service }}
{{ $envfile := .Get "envfile" | default ( print "./env/" $name ".env" ) }}

Load the service's environment file:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
  .services.{{ $service }}.env_file |= . + []
| with(.services.{{ $service }}.env_file | select(any_c(. == "{{ $envfile }}") | not);
    . |= . + [ "{{ $envfile }}" ]
  | . head_comment = "Load service's environment (a.k.a. settings) from file."
)
EOF
```
