{{/*
domain_ip shortcode.
Detect IP address of given domain, using dig
usage:
    { {% snippets/domain_ip
        prefix="domain_"
        domain="${domain}"
        hide-text="false"
    %} }
*/}}
{{ $prefix := .Get "prefix" | default "domain_" }}
{{ $domain := .Get "domain" | default "${domain}" }}
{{ $hide_text := .Get "hide-text" | default "false" }}

{{ if eq $hide_text "false" }}
Fetch the IP address of `{{$domain}}` from DNS server:
{{ end }}

```bash
{{$prefix}}ip="$( command dig +short "{{$domain}}" )"
```
