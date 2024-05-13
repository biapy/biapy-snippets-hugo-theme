{{/*

Declare the service available for exposure by the Traefik instance named
`${traefik_instance}`.

Usage:

  {{% docker/compose/service/labels/traefik/enable "service-name" %}}

or

  {{% docker/compose/service/labels/traefik/enable service="service-name" %}}

cSpell:ignore traefik

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if or (not $service) (ne 1 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Enable _Traefik_ for the `{{ $service }}` service,
and associate the service to the selected _Traefik_ instance:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"} |= . + {
  "traefik.enable": "true",
  "traefik.exposed-by-instance": "${traefik_instance:-"traefik-public"}"
}
EOF
```
