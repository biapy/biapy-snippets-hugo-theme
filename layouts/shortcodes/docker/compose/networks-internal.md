{{/*

Isolate a network,
to prevent connection to external networks (Internet):

Usage:

{{% docker/compose/networks-internal "${network_code}" %}}

or

{{% docker/compose/networks-internal name="${network_code}" %}}

*/}}
{{- $name := .Get "name" | default (.Get 0 | default "default") -}}

Isolate the `{{ $name }}` network,
to prevent services from connecting to external networks (Internet)
by using its gateway:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
.networks.{{ $name }}.internal = true
EOF
```
