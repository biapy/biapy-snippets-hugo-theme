{{/*

Call apt-get install for the given packages

usage:

{{% deb/apt-install "software-one" "software-two" %}}

*/}}
{{- if (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at least a package name as parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Install the software:

```bash
{{ $command := "sudo apt 'install'" -}}
{{- $command -}}
{{- .Scratch.Set "length" ($command | len) -}}
{{- range $package := .Params }}
{{- $.Scratch.Add "length" ( add 1 ($package | len)) -}}
{{- if (gt ($.Scratch.Get "length") 78) -}}
{{- $.Scratch.Set "length" ( add 2 ($package | len)) }} \
 {{ end }} "{{ $package }}"
{{- end }}
```
