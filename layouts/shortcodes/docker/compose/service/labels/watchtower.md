{{/*

Add a label to the service, signaling Watchtower it's allowed to update the
service.

Usage:

  {{% docker/compose/service/labels/watchtower "service-name" %}}

or

  {{% docker/compose/service/labels/watchtower service="service-name" %}}

cSpell:ignore centurylinklabs

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if or (not $service) (ne 1 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Allow _Watchtower_ to update the `{{ $service }}` service:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
${labels_node:-".services.{{ $service }}.labels"}."com.centurylinklabs.watchtower.enable" = "true"
EOF
```
