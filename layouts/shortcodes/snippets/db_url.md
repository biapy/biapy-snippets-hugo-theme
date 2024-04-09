{{/*

Compute the (PostgreSQL) database URI with URL encoded username and password

Usage:

{{% snippets/db_url %}}

or:

{{% snippets/db_url parameters="serverVersion=16&charset=utf8" %}}

or:

{{% snippets/db_url proto="mysql" host="mariadb:3306"
      parameters="serverVersion=10.5.8-MariaDB" %}}

*/}}

{{- $proto := .Get "proto" | default "postgres" -}}
{{- $host := .Get "host" | default "postgres" -}}
{{- $parameters := .Get "parameters" -}}

Generate the database URL:

```bash
db_url="{{ $proto }}://$(
    python3 -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< "${db_username}"
  ):$(
    python3 -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< "${db_password}"
  )@{{ $host }}/${db_name}
  {{- with $parameters -}}
    ?{{- . -}}
  {{- end -}}"
```
