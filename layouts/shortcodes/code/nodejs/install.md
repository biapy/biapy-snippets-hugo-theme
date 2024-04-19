{{/*

Install the given npm packages

usage:

{{% code/nodejs/install "software-one" "software-two" %}}

or

{{% code/nodejs/install --dev "software-one" "software-two" %}}

*/}}
{{- $dev := false -}}
{{- $params := .Params -}}
{{- if eq "--dev" (collections.Index $params 0) -}}
  {{- $dev = true -}}
  {{- $params = collections.After 1 $params -}}
{{- end -}}
{{- if not $params -}}
  {{-
    errorf
    "The %q shortcode requires at list a package name as parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{ $command := "packages=(" -}}
{{- $command -}}
{{- .Scratch.Set "length" ($command | len) -}}
{{- range $package := $params }}
{{- $.Scratch.Add "length" ( add 3 ($package | len)) -}}
{{- if (gt ($.Scratch.Get "length") 76) -}}
{{- $.Scratch.Set "length" ( add 4 ($package | len)) }}
 {{ end }} "{{$package}}"
{{- end }} )
if [[ -e ".yarn" ]]; then
  command yarn add {{- with $dev }} --dev {{- end }} "${packages[@]}"
else
  command npm install {{- with $dev }} --save-dev {{- end }} "${packages[@]}"
fi