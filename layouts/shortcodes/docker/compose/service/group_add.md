{{/*

Add a service default user to the given groups ("$(command id -g)") by default.

Usage:

{{% docker/compose/service/group_add "${service_name}" %}}

or

{{% docker/compose/service/group_add "${service_name}" "$(command id -g)"
  "$(command getent 'group' 'docker' | command cut --delimiter=':' --fields=3)"
%}}

or

  {{% docker/compose/service/group_add service="${service_name}"
    groups="$(command id -g),docker" %}}

<!-- cSpell:ignore getent -->
*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $groups := slice -}}
{{- if .IsNamedParams -}}
  {{- $groups = ( collections.Apply
    ( strings.Split
      ( strings.Replace ( .Get "groups" | default "" ) "," " " )
      " "
    )
    "strings.Trim" "." " \t\r\n" ) | complement ( slice "" )
  -}}
{{- else -}}
  {{- $groups = collections.After 1 .Params -}}
{{- end -}}
{{- $groups = $groups | default ( slice "$(command id -g)" ) -}}
{{- if not $service -}}
  {{-
    errorf (printf "%s %s"
      "The %q shortcode requires a 'service' name and a optional 'groups' list."
      "See %s"
    ) .Name .Position
  -}}
{{- end -}}

Add the `{{ $service }}` service's default user to other groups
(allow access to mounted files contents, such as secrets):

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.group_add = [
{{- $firstLoop := true }}
{{- range $group := $groups }}
  {{- if not $firstLoop -}} , {{- end }}
  "{{ $group }}"
  {{- $firstLoop = false }}
{{- end }}
]
EOF
```
