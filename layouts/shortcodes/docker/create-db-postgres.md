{{/*

Create the software's PostgreSQL database:

Usage:

{{% docker/create-db-postgres %}}

*/}}

Create the software's PostgreSQL database:

```bash
command docker compose --file "${compose_path}/postgres/docker-compose.yml" \
  exec --interactive --tty 'postgres' \
  psql --username="${postgres_username}" 'postgres' --password \
  --command="CREATE ROLE \"${db_username}\" PASSWORD '${db_password}'
              NOCREATEDB NOCREATEROLE NOSUPERUSER INHERIT LOGIN" \
  --command="CREATE DATABASE \"${db_name}\"
                WITH OWNER \"${db_username}\" ENCODING 'UTF8';"
```
