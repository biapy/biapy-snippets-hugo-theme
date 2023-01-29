
{{ $service := .Get "service" | default "${project_name}" }}
{{ $secrets := ( split ( .Get "secrets" ) "," ) }}

###### Secrets {#{{ $service }}-service-secrets}

Associate docker secrets with the service (create a file named with the secret
name in the container `/run/secrets` directory):

```bash
while read -r 'secret'; do
  # Add volume declaration if not already present.
  command yq --inplace 'eval' \
    ".services.{{ $service }}.secrets |= . + []
    | with(.services.{{ $service }}.secrets
          | select( any_c( . == \"${project_name}-${secret}\" ) | not) ;
      . |= . + [ \"${project_name}-${secret}\" ]
    )" \
    "${compose_project_path}/docker-compose.yml"
done << EOF
{{- range $secret := $secrets }}
{{ $secret }}
{{- end }}
EOF
```
