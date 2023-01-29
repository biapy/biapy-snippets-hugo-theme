<!--
interface_ip shortcode.
Detect IP address of given interface
usage: { {% snippets/interface_ip prefix="interface_" interface="eth0" %} }
-->
{{ $prefix := .Get "prefix" | default "interface_" }}
{{ $interface := .Get "interface" }}

{{- if eq ( .Get "hide-text" | default "false" ) "false" -}}
Detect the IP address of `{{$interface}}` interface:
{{- end }}

```bash
{{$prefix}}ip="$(command ip addr show "{{$interface}}" \
  | command grep --perl-regex --only-matching 'inet \K[\d.]+')"
```
