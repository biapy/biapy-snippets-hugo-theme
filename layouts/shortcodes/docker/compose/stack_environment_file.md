{{ $service := .Get "service" | default "${project_name}" }}
{{ $name := .Get "name" | default $service }}
{{ $envfile := .Get "envfile" | default ( print "./env/" $name ".env" ) }}

Load the service's environment file:

```bash
command yq --inplace 'eval' \
  ".services.{{ $service }}.env_file |= . + []
  | with( .services.{{ $service }}.env_file
    | select( any_c( . == \"{{ $envfile}}\" ) | not) ;
      . |= . + [ \"{{ $envfile }}\" ]
    |  . head_comment=\"Load service's environment (a.k.a. settings) from file.\"
  )" \
  "${compose_project_path}/docker-compose.yml"
```
