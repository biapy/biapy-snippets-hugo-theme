
{{ $service := .Get "service" | default "${project_name}" }}
{{ $secrets := ( split ( .Get "secrets" ) "," ) }}

###### Secrets {#{{ $service }}-service-secrets}

Associate docker secrets with the service (create a file named with the secret
name in the container `/run/secrets` directory):

```bash
while read -r 'secret'; do
  # Add volume declaration if not already present.
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
.services.{{ $service }}.secrets |= . + []
| with(.services.{{ $service }}.secrets | select( any_c( . == "${secret}" ) | not);
    . |= . + [ "${secret}" ]
  )
EOF
done << EOF
{{- range $secret := $secrets }}
{{ $secret }}
{{- end }}
EOF
```
