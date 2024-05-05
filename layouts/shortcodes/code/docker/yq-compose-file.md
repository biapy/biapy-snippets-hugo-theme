{{/*

Output yq command to update compose file from stdin, for use in code fences

Usage:

```bash
{{% code/docker/yq-compose-file %}} <<EOF
.property = "value"
EOF
```

*/}}
{{- if .Params -}}
  {{-
    errorf
    "The %q shortcode requires doesn't accept parameters. See %s"
    .Name .Position
  -}}
{{- end -}}
{{- partialCached "docker/yq-compose-file.md" . -}}
