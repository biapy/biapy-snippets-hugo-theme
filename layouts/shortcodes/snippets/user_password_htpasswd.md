{{- $prefix := .Get "prefix" -}}
{{- $name := .Get "name" | default "the software" -}}

Generate a `htpasswd` entry for {{ $name }}:

```bash
{{$prefix}}htpasswd="$(
  command htpasswd -niB "${{ "{" }}{{$prefix}}username}" <<< "${{ "{" }}{{$prefix}}password}"
)"
```

{{- "" -}}
