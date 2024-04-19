{{/*

Output yq command to update the given file from stdin, for use in code fences

Usage:

```bash
{{% code/yq "file.yaml" %}} <<EOF
.property = "value"
EOF
```

or

```bash
echo '.property = "value"' |
  {{% code/yq path="file.yaml" %}}
```

*/}}
{{- $path := .Get "path" | default (.Get 0) -}}
{{- if (not $path) -}}
  {{-
    errorf
    "The %q shortcode requires 'path' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
command yq --inplace 'eval(load_str("/dev/stdin"))' "{{ $path }}"