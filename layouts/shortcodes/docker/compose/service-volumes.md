{{/*

Adds volumes configuration to a `docker-compose.yml`` service.

Usage:

{ {% docker/compose/service-volumes service="<service-name>" %} }
/var/run/docker.sock:/var/run/docker.sock:ro
./etc:/etc/service:ro
service_data:/app/data
{ {% / docker/compose/service-volumes %} }

*/}}
{{ $service := .Get "service" | default "${project_name}" }}

###### Volumes {#{{ $service }}-service-volumes}

Add the `volumes` section, if missing:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }}.volumes;
    . |= . + []
  | . line_comment="Timezone and volumes declarations."
)
EOF
```

Add the service's timezone configuration and volumes:

```bash
while read -r 'volume'; do
  # Add volume declaration if not already present.
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
  .services.{{ $service }}.volumes |= . + []
| with(.services.{{ $service }}.volumes
  | select( any_c( . == "${volume}" ) | not);
    . |= . + [ "${volume}" ]
)
EOF
done << EOF
/etc/timezone:/etc/timezone:ro
/etc/localtime:/etc/localtime:ro
{{- .Inner -}}
EOF
```
