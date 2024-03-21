{{/*

Detect an user id in a Docker image.

Usage:

{{% docker/container_uid "company/image:latest" %}}
{{% docker/container_uid user="root" "company/image:latest" %}}

*/}}
{{ if isset .Params "user" }}
{{ $user := .Get "user" }}

Detect the user `{{ $user }}`'s id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' \
  "{{ .Get 0 }}" -u {{ $user }})"
```

{{ else }}

Detect the default user's id in the Docker image:

```bash
container_uid="$(docker run --rm --entrypoint='/usr/bin/id' "{{ .Get 0 }}" -u)"
```

{{ end }}
