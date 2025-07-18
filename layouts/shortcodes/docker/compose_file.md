{{/*

Set `${compose_file}` value

Usage:

{{% docker/compose_file %}}

*/}}
{{- if .Params -}}
  {{-
    errorf
    "The %q shortcode requires doesn't accept parameters. See %s"
    .Name .Position
  -}}
{{- end -}}
Set the `compose.yml` path:

```bash
compose_file="${compose_project_path}/compose.yml"
```

{{- "" -}}
