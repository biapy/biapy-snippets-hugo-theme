{{ $networks := ( split ( .Get "networks" ) "," ) }}

### External networks

Create the missing external networks:

```bash
while read -r 'name'; do
  network="${name}_network"
  [[ -n "${!network}" && \
    -z "$( command docker network ls --quiet \
            --filter="name=${!network}" )" ]] \
    && command docker network create --driver "${network_driver}" \
        --label "com.docker.stack.namespace=${name}" \
        --attachable "${!network}"
done {{ safeHTML "<<" }} EOF
{{- range $network := $networks }}
{{ $network }}
{{- end }}
EOF
```
