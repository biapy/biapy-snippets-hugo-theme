{{/*

Detect a Docker network first subnet.

Usage:

{{% docker/network_subnet "example_subnet""example-net" %}}

{{% docker/network_subnet name="example_subnet" network="example-net" %}}

<!-- CSpell:ignore subnetwork IPAM readarray println -->
<!-- vale RedHat.Spacing = NO -->

*/}}
{{- $name := .Get "name" | default (.Get 0 | default false) -}}
{{- $network := .Get "network" | default (.Get 1 | default false) -}}
{{- if or (not $name) (not $network) (ne 2 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires 'name' and 'network' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Detect `{{ $network }}` subnetwork:

{{/*

```bash
{{ $name }}="$(command docker network inspect \
    --format "{{ "{{" }}(index .IPAM.Config 0).Subnet}}" "{{ $network }}")"
```

*/}}

```bash
readarray -t "{{ $name }}" < <(
  command docker network inspect \
    --format "{{ "{{" }}range .IPAM.Config}}{{ "{{" }}println .Subnet}}{{ "{{" }}end}}" \
    "{{ $network }}" |
    command grep -v '^$'
)
```
