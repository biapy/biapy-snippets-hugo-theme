{{/*

Detect an group id in a Docker image.

Usage:

{{% docker/container_gid "company/image:latest" %}}
{{% docker/container_gid group="root" image="company/image:latest" %}}

*/}}
{{- $image := .Get "image" | default (.Get 0 | default false) -}}
{{- $group := .Get "group" | default false -}}
{{- if (and (not .IsNamedParams) (ne 1 (.Params | len))) -}}
  {{-
    errorf
    "The %q shortcode requires one unnamed parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{- if (not $image) -}}
  {{-
    errorf
    "The %q shortcode requires 'image' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{ if $group }}

Detect the `{{ $group }}` group's id in the `{{ $image }}` _Docker_ image:

```bash
container_gid="$(docker run --rm --entrypoint='/usr/bin/id' \
  "{{ $image }}" -g "{{ $group }}")"
```

{{ else }}

Detect the default group's id in the `{{ $image }}` _Docker_ image:

```bash
container_gid="$(docker run --rm --entrypoint='/usr/bin/id' "{{ $image }}" -g)"
```

{{ end }}
