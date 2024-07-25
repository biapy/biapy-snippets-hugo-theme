{{/*

Detect an user id in a Docker image.

Usage:

{{% docker/container_uid "company/image:latest" %}}
{{% docker/container_uid user="root" image="company/image:latest" %}}

*/}}
{{ $image := .Get "image" | default (.Get 0 | default false) }}
{{ $user := .Get "user" | default false }}
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
{{ if $user }}

Detect the `{{ $user }}` user's id in the `{{ $image }}` _Docker_ image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' \
  "{{ $image }}" -u "{{ $user }}")"
```

{{ else }}

Detect the default user's id in the `{{ $image }}` _Docker_ image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' "{{ $image }}" -u)"
```

{{ end }}
