{{/*

Set the group of the secrets files

Usage:

{{% docker/secrets-files-chgrp %}}

or:

{{% docker/secrets-files-chgrp
  "http_username" "http_password"
  "db_username" "db_password"
  "${project_name}-ssl-key" "${project_name}-ssl-cert"
%}}

<! cSpell:ignore chgrp -->

*/}}

Allow the container's group to read secrets files:

{{ with .Params -}}

```bash
sudo --validate &&
  for secret in
    {{- range $name := . }} "{{ $name }}"{{ end }}; do
    secret_file="${compose_project_path}/secrets/${secret}.secret"
    [[ -e "${secret_file}" ]] &&
      sudo chgrp "${container_gid}" "${secret_file}" &&
      sudo chmod g+r "${secret-file}"
  done
```

{{- else -}}

```bash
sudo chgrp "${container_gid}" "${compose_project_path}/secrets/"*.secret &&
  sudo chmod g+r "${compose_project_path}/secrets/"*.secret
```

{{- end }}
