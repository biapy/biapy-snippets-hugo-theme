{{/*

Create the software's PostgreSQL database:

Usage:

{{% docker/create-db-postgres %}}

cSpell:ignore postgres psql NOCREATEDB NOCREATEROLE NOSUPERUSER

*/}}

Create the software's PostgreSQL database:

```bash
command docker compose --file "${compose_path}/postgres/compose.yml" \
  exec 'postgres' \
  psql --username="${postgres_username:-postgres}" 'postgres' --password \
  --command="CREATE ROLE \"${db_username}\" PASSWORD '${db_password}'
              NOCREATEDB NOCREATEROLE NOSUPERUSER INHERIT LOGIN" \
  --command="CREATE DATABASE \"${db_name}\"
                WITH OWNER \"${db_username}\" ENCODING 'UTF8';"
```
