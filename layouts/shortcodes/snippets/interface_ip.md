{{/*
interface_ip shortcode.
Detect IP address of given interface

@param string prefix Set output variable prefix.
@param string interface Set the interface name.
@param bool hide-text True to hide the text.
@param bool with-mask True to get the IP range instead of the IP address.

usage: { {% snippets/interface_ip prefix="interface_" interface="eth0"
                hide-text="false" with-mask="false" %} }
*/}}
{{ $prefix := .Get "prefix" | default "interface_" }}
{{ $interface := .Get "interface" }}
{{ $with_mask := .Get "with-mask" | default "false" }}

{{- if eq ( .Get "hide-text" | default "false" ) "false" -}}
Detect the IP {{ if ne $with_mask "false" -}}
    address
  {{- else -}}
    range
  {{- end }} of `{{$interface}}` interface:
{{- end }}

```bash
LANG='C' {{$prefix}}ip="$(command ip addr show "{{$interface}}" \
  | command grep --perl-regex --only-matching 'inet \K[\d\.]+
{{- if ne $with_mask "false" -}}
  /[\d]+
{{- end -}}
')"
```
