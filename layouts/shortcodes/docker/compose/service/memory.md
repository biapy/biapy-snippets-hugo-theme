{{/*

Set the service memory restrictions.

Usage:

{{% docker/compose/service/memory "${service_name}" "256m" %}}

or

  {{% docker/compose/service/cpu service="${service_name}"
    limit="256m" reservation="128m" swappiness="60" swap-limit="1g" %}}

- `mem_limit` configures a limit on the amount of memory a container can allocate.
- `mem_reservation` configures a reservation on the amount of memory a container
  can allocate, smaller than `mem_limit`.
- `mem_swappiness` defines as a percentage, between 0 and 100,
  for the host kernel to swap out anonymous memory pages used by a container.

  - 0: Turns off anonymous page swapping.
  - 100: Sets all anonymous pages as swappable.

  The default value is platform specific.
- `memswap_limit` defines the amount of memory the container is allowed to swap
  to disk.
  This is a modifier attribute that only has meaning if memory is also set.

@see [Resource constraints](https://docs.docker.com/engine/containers/resource_constraints/).
@see [mem_limit @ Services top-level elements](https://docs.docker.com/reference/compose-file/services/#mem_limit).

<!-- cSpell:ignore getent swappable memswap -->
*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $mem_limit := .Get "limit" | default (.Get 1 | default false) -}}
{{- $mem_reservation := .Get "reservation" | default false -}}
{{- $mem_swappiness := .Get "swappiness" | default false -}}
{{- $memswap_limit := .Get "swap-limit" | default false -}}
{{- if or (not $service) (not $mem_limit) -}}
  {{-
    errorf
    "The %q shortcode requires a 'service' name and a 'limit' parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Set the `{{ $service }}` service's memory limits:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  .services.{{ $service }}.mem_limit = "{{ $mem_limit }}"
{{- if $mem_reservation }}
| .services.{{ $service }}.mem_reservation = "{{ $mem_reservation }}"
{{- end -}}
{{- if $mem_swappiness }}
| .services.{{ $service }}.mem_swappiness = {{ $mem_swappiness }}
{{- end -}}
{{- if $memswap_limit }}
| .services.{{ $service }}.memswap_limit = "{{ $memswap_limit }}"
{{- end }}
EOF
```
