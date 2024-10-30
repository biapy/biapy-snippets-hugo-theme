{{/*

Add a label to the service, signaling CrowdSec to watch its logs.

Usage:

{{% docker/compose/service/labels/crowdsec "service-name" "type" %}}

or

{{% docker/compose/service/labels/crowdsec service="service-name"
  type="type" %}}

<!-- CSpell:ignore crowdsec -->
<!-- vale Microsoft.Terms = NO -->

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $type := .Get "type" | default (.Get 1 | default false) -}}
{{- if or (not $service) (not $type) (ne 2 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires 'service' and 'type' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Enable CrowdSec agent to analyze the `{{ $service }}` service's
`{{ $type }}` logs:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  ${labels_node:-".services.{{ $service }}.labels"}."crowdsec.enable" = true
| ${labels_node:-".services.{{ $service }}.labels"}."crowdsec.labels.type" = "{{ $type }}"
EOF
```
