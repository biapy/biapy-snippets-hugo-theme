{{/*

Declare a service dependencies

Usage:

{{% docker/compose/service/depends_on service="service"
  postgres="service_healthy"
  migration="service_completed_successfully"
  worker="service_started"
%}}

CSpell:ignore postgres cond

*/}}
{{- $validConditions := slice "service_healthy"
  "service_completed_successfully" "service_started" -}}
{{- $shortcodeName := .Name -}}
{{- $shortcodePosition := .Position -}}
{{- $service := .Get "service" | default false -}}
{{- if or (not .IsNamedParams) (not $service) (lt (.Params | len) 2) -}}
{{-
    errorf
    "The %q shortcode requires 'service' and dependencies parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Declare the `{{ $service }}` service's dependencies:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
{{- $firstLoop := true }}
{{- range $dependency, $condition := .Params }}
  {{- if eq "service" $dependency -}}{{- continue -}}{{- end -}}
  {{- if not (or (eq "" $condition) (in $validConditions $condition)) -}}
    {{-
      errorf
      "Invalid dependency condition given to %q shortcode. See %s"
      $shortcodeName $shortcodePosition
    -}}
  {{- end -}}
  {{- print (cond $firstLoop "\n  " "\n| ") -}}
  .services.{{ $service }}.depends_on.{{ $dependency }}.condition = "{{ $condition | default "service_started" }}"
  {{- $firstLoop = false }}
{{- end }}
EOF
```
