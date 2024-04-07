{{/*

Ask for the "domain" setting value.

Usage:

{{% settings/domain "mautic.domain.com" %}}

or

{{% settings/domain domain="traefik.localhost" %}}

*/}}
{{ $domain := .Get "domain" | default (.Get 0) |
  default "${project_name}.domain.com" }}

Set the software's domain name:

```bash
domain="{{ $domain }}"
```
