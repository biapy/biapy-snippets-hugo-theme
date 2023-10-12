{{/*

Declare the service available for exposure by the Traefik instance named
`${traefik_instance}`.

Usage:

  {{% docker/traefik-routing/10-indent service="service-name" %}}

*/}}
Enable Traefik for the service, and associate the service to the selected
Traefik instance:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' \
  "${compose_project_path}/docker-compose.yml" << EOF
${labels_node} |= . + {
  "traefik.enable": "true",
  "traefik.exposed-by-instance": "${traefik_instance}"
}
EOF
```
