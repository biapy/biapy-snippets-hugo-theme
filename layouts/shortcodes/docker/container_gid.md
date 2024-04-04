{{/*

Detect an group id in a Docker image.

Usage:

{{% docker/container_gid "company/image:latest" %}}
{{% docker/container_gid group="root" image="company/image:latest" %}}

*/}}
{{ $image := .Get "image" | default (.Get 0) }}
{{ $group := .Get "group" | default false }}
{{ if $group }}

Detect the `{{ $group }}` group's id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' \
  "{{ $image }}" -g "{{ $group }})"
```

{{ else }}

Detect the default group's id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' "{{ $image }}" -g"
```

{{ end }}
