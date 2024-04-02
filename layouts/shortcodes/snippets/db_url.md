{{- $proto := .Get "proto" | default "postgres" -}}
{{- $host := .Get "host" | default "postgres" -}}
{{- $parameters := .Get "parameters" -}}
Generate the database URL:

```bash
db_url="{{ $proto }}://$(
    python3 -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< "${db_username}"
  ):$(
    python3 -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< "${db_password}"
  )@{{ $host }}/${db_name}{{ $parameters }}"
```
