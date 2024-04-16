{{/*

Call apt-get install for the given packages

usage:

{{% code/deb/apt-install "software-one" "software-two" %}}

*/}}
{{- if (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at list a package name as parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{ $command := "sudo apt 'install' --assume-yes" -}}
{{- $command -}}
{{- .Scratch.Set "length" ($command | len) -}}
{{- .Scratch.Set "length" 32 -}}
{{- range $package := .Params }}
{{- $.Scratch.Add "length" ( add 1 ($package | len)) -}}
{{- if (gt ($.Scratch.Get "length") 76) -}}
{{- $.Scratch.Set "length" ( add 2 ($package | len)) }} \
 {{ end }} "{{$package}}"
{{- end -}}
