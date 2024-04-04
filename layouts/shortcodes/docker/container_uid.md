{{/*

Detect an user id in a Docker image.

Usage:

{{% docker/container_uid "company/image:latest" %}}
{{% docker/container_uid user="root" image="company/image:latest" %}}

*/}}
{{ $image := .Get "image" | default (.Get 0) }}
{{ $user := .Get "user" | default false }}
{{ if $user }}

Detect the `{{ $user }}` user's id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' \
  "{{ $image }}" -u "{{ $user }})"
```

{{ else }}

Detect the default user's id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' "{{ $image }}" -u)"
```

{{ end }}
