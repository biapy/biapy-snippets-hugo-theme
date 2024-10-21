
{{/*

Install given collection in CrowdSec agent:

Usage:

{{% docker/crowdsec-collection "collection" %}}

or

{{% docker/crowdsec-collection name="collection" %}}

<!-- CSpell:ignore crowdsec cscli -->
<!-- vale Microsoft.Terms = NO -->

*/}}
{{- $name := .Get "name" | default (.Get 0 | default false) -}}
{{- if or (not $name) (ne 1 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires a 'name' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Install `{{ $name }}` collection in CrowdSec agent:

```bash
docker compose --file="${compose_path:-"${HOME}/docker-compose"}/crowdsec/compose.yml" \
    exec 'crowdsec-agent' \
    cscli collections install '{{ $name }}'
```
