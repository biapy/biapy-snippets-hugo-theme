{{/*

Add a init process to a service
(to reap health checks wget and ssl_client processes)

Usage:

{{% docker/compose/service/init "${service_name}" %}}

or

  {{% docker/compose/service/init service="${service_name}" %}}

<!-- cSpell:ignore getent -->
*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- if not $service -}}
  {{-
    errorf (printf "%s %s"
      "The %q shortcode requires a 'service' name."
      "See %s"
    ) .Name .Position
  -}}
{{- end -}}

Add an init process to the `{{ $service }}` service
(an init process (PID 1) forwards signals and reaps processes):

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.init = true
EOF
```
