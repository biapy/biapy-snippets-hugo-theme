{{/*

Set the owner of the secrets files

Usage:

{{% docker/secrets-files-chown %}}

or:

{{% docker/secrets-files-chown
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

*/}}

Allow the container's user to read secrets  files:

{{ with .Params -}}

```bash
sudo --validate &&
  for secret in (
    {{- range $name := .Params }} "{{ $name }}"{{ end }} ); do
    secret_file="${compose_project_path}/secrets/${secret}.secret"
    [[ -e "${secret_file}" ]] && sudo chown "${container_uid}" "${secret_file}"
  done
```

{{- else -}}

```bash
sudo chown "${container_uid}" "${compose_project_path}/secrets/"*.secret
```

{{- end }}
