{{/*

Adds port configuration to a `docker-compose.yml`` service.

Code version, for inclusion in a Bash highlight shortcode.

Usage:

{ {% code/docker/compose/service/ports service="service-name" %} }
:1704/udp:1704/udp
{ {% / code/docker/compose/service/ports %} }

*/}}
{{- $service := .Get "service" | default "${project_name}" -}}
while read -r 'exposed_port'; do
  # Add exposed port declaration if not already present.
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
with(.services.{{ $service }}.ports;
    . |= . + []
  | with(. | select( any_c(. == "${exposed_port}") | not);
      . |= . + [ "${exposed_port}" ]
    )
)
EOF
done << EOF
{{ .InnerDeindent | markdownify }}
EOF
