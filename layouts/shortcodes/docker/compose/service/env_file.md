{{/*

Add environment files to a service `env_file` list.

usage:

  {{% docker/compose/service/env_file "${service_name}" %}}

or:

  {{% docker/compose/service/env_file "${service_name}"
    "./env/${service_name}.env" %}}

or:

  {{% docker/compose/service/env_file service="${service_name}"
    path="./env/${service_name}.env" %}}

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{ $path := .Get "path" | default (
    .Get 1 | default ( print "./env/" $service ".env" )
  ) }}
{{- if not $service  -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{- if gt (.Params | len) 2 -}}
  {{-
    errorf
    "The %q shortcode accept at most 2 parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Set the environment file to load the `{{ $service }}` service's configuration
from:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.services.{{ $service }}.env_file |= . + [ "{{ $path }}" ]
EOF
```
