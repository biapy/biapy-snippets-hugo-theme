{{ $service := .Get "service" | default "${project_name}" }}

###### Volumes {#{{ $service }}-service-volumes}

Add the `volumes` section, if missing:

```bash
command yq --inplace 'eval' \
  'with(.services.{{ $service }}.volumes;
    . |= . + []
    | . line_comment="Timezone and volumes declarations."
  )' \
  "${compose_project_path}/docker-compose.yml"
```

Add the service's timezone configuration and volumes:

```bash
while read -r 'volume'; do
  # Add volume declaration if not already present.
  command yq --inplace 'eval' \
    "with(.services.{{ $service }}.volumes
          | select( any_c( . == \"${volume}\" ) | not) ;
      . |= . + [ \"${volume}\" ]
    )" \
    "${compose_project_path}/docker-compose.yml"
done << EOF
/etc/timezone:/etc/timezone:ro
/etc/localtime:/etc/localtime:ro
{{- .Inner -}}
EOF
```
