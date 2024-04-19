{{/*

Install the given npm packages

usage:

{{% code/nodejs/install "software-one" "software-two" %}}

*/}}
{{- if (not .Params) -}}
  {{-
    errorf
    "The %q shortcode requires at list a package name as parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{ $command := "packages=(" -}}
{{- $command -}}
{{- .Scratch.Set "length" ($command | len) -}}
{{- range $package := .Params }}
{{- $.Scratch.Add "length" ( add 3 ($package | len)) -}}
{{- if (gt ($.Scratch.Get "length") 76) -}}
{{- $.Scratch.Set "length" ( add 4 ($package | len)) }} \
 {{ end }} "{{$package}}"
{{- end -}}
)
if [[ -e ".yarn" ]]; then
  command yarn add --dev "${packages[@]}"
else
  command npm install --save-dev "${packages[@]}"
fi