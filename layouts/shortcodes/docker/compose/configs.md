{{/*

Declare the Compose file's used configuration files

Usage:

{{% docker/compose/configs
  "./etc/phpmyadmin-config.user.inc.php"
%}}

*/}}

Declare the configuration files this Compose file's services use:

```bash
command yq --inplace 'eval(load_str("/dev/stdin"))' "${compose_file}" <<EOF
  .configs |= . + {}
{{- range $file := .Params }}
| .configs."{{ path.Base$file }}".file = "{{ $file }}"
{{- end }}
EOF
```
