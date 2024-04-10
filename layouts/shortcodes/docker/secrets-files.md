{{/*

Store the Compose file's secrets in files

Usage:

{{% docker/secrets-files
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

*/}}

Store the Docker stack’s secrets in files:

```bash
command mkdir --parent "${compose_project_path}/secrets" &&
for secret in (
  {{- range $name := .Params }} "{{ $name }}"{{ end }} ); do
  secret_file="${compose_project_path}/secrets/${secret}.secret"
  command echo -n "${!secret}" > "${secret_file}" &&
    command chmod go-rwx "${secret_file}"
done
```
