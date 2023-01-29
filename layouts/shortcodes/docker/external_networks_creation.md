{{ $networks := ( split ( .Get "networks" ) "," ) }}

### External networks

Create the missing external networks:

```bash
while read -r 'network_name'; do
  [[ -n "${network_name}" && \
    -z "$( command docker network ls --quiet \
            --filter="name=${network_name}" )" ]] \
    && command docker network create --driver "${network_driver}" \
        --attachable "${network_name}"
done {{ safeHTML "<<" }} EOF
{{- range $network := $networks }}
${{ htmlEscape "{" }}{{ $network }}}
{{- end }}
EOF
```
