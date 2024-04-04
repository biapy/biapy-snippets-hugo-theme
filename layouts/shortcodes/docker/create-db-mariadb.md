{{/*

Create the software's MariaDB database:

Usage:

{{% docker/create-db-mariadb %}}

*/}}

Create the software's MariaDB database:

```bash
command docker 'compose' \
  --file "${compose_path}/mariadb/docker-compose.yml" \
  exec --interactive --tty 'mariadb' mariadb --user='root' \
    --password="$(
      command cat "${compose_path}/mariadb/secrets/mariadb_root_password.secret"
    )" \
    --execute="
      CREATE DATABASE \`${db_name}\`
        DEFAULT CHARACTER SET utf8mb4
        DEFAULT COLLATE utf8mb4_unicode_ci;
      GRANT ALL ON \`${db_name}\`.*
        TO \`${db_username}\`@\`%\`
        IDENTIFIED BY '${db_password}';
    "
```
