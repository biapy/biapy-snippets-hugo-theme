{{- $name := .Get "name" | default (.Get 0) | default "software" -}}
{{- $domain := .Get "domain" | default (.Get 1) | default "${domain//\\./-}" -}}
Generate the database credentials:

```bash
db_name="{{ $name }}_{{ $domain }}"
db_username="{{ substr $name 0 1 }}_{{ $domain }}"
```
