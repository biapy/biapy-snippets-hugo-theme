{{/*

Change the access rights of the secrets files (go-rw,g+r)

Usage:

{{% docker/secrets-files-chmod %}}

or:

{{% docker/secrets-files-chmod
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

<!-- cSpell:ignore chgrp -->

*/}}

Allow the current user's default group to read secrets files:

{{ with .Params -}}

```bash
for secret in
  {{- range $name := . }} "{{ $name }}"{{ end }}; do
  secret_file="${compose_project_path}/secrets/${secret}.secret"
  [[ -e "${secret_file}" ]] &&
    command chmod 'go-rw,g+r' "${secret_file}" &&
    command chgrp "$(command id -g)" "${secret_file}"
done
```

{{- else -}}

```bash
command chmod 'go-rw,g+r' "${compose_project_path}/secrets/"*.secret &&
  command chgrp "$(command id -g)" "${compose_project_path}/secrets/"*.secret
```

{{- end }}
