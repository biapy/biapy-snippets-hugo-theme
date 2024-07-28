{{/*

Enable an extension for a PostgreSQL database:

Usage:

{{% docker/postgres-extension "hstore" %}}

or:

{{% docker/postgres-extension name="hstore" %}}

CSpell:ignore postgres hstore psql dbname

*/}}
{{ $name := .Get "name" | default (.Get 0) }}
{{- if (not $name) -}}
  {{-
    errorf
    "The %q shortcode requires 'name' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Enable `{{ $name }}` PostgreSQL extension for the database:

```bash
command docker compose --file "${compose_path}/postgres/compose.yml" \
  exec 'postgres' \
  psql --username="${postgres_username:-postgres}" --password \
    --dbname="${db_name}" --command="CREATE EXTENSION {{ $name }};"
```
