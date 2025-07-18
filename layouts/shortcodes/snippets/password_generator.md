{{/*

Generate a random password using OpenSSL
usage:

{{% snippets/password_generator prefix="root_" type="password"
    name="administration" typename="password" zerogen="false"
    min="16" max="32" %}}

CSpell:ignore zerogen openssl

*/}}
{{- $prefix := .Get "prefix" -}}
{{- $type := .Get "type" | default "password" -}}
{{- $name := .Get "name" -}}
{{- $type_name := .Get "typename" | default "password" -}}
{{- $min := int ( .Get "min" | default "16" ) -}}
{{- $max := int ( .Get "max" | default "28" ) -}}
{{- $random_needed := "" -}}
{{- $random_test := "" -}}
{{- if not ( eq ( .Get "zerogen" ) "false" ) -}}
{{- $random_needed = " (if needed)" -}}
{{- $random_test = ( printf "[ -z \"${%s%s}\" ] && " $prefix $type ) -}}
{{- end -}}

Generate a random {{$name}} {{$type_name}}{{$random_needed}}:

```bash
{{ safeHTML $random_test -}}{{- $prefix -}}{{- $type -}}="$(
  command openssl rand -base64 {{ add $max 10 }} |
    command tr --delete '=\n' |
    command head --bytes=$(( {{$min}} + ( ${RANDOM} % {{ add ( sub $max $min ) 1 }} ) ))
)"
```

{{- "" -}}
