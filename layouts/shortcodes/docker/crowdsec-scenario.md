{{/*

Install given scenario in CrowdSec agent:

Usage:

{{% docker/crowdsec-scenario "scenario" %}}

or

{{% docker/crowdsec-scenario name="scenario" %}}

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

Install `{{ $name }}` scenario in CrowdSec agent:

```bash
docker compose --file="${compose_path:-"${HOME}/docker-compose"}/crowdsec/compose.yml" \
    exec 'crowdsec-agent' \
    cscli scenarios install '{{ $name }}'
```
