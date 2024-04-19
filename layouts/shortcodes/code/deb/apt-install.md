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
{{- range $package := .Params }}
{{- $.Scratch.Add "length" ( add 3 ($package | len)) -}}
{{- if (gt ($.Scratch.Get "length") 76) -}}
{{- $.Scratch.Set "length" ( add 4 ($package | len)) }} \
 {{ end }} "{{$package}}"
{{- end -}}