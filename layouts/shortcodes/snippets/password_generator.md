{{/*
password_prompt shorcode.
Add a prompt for user to provide a password for given usage.
usage:

  {{% snippets/password_generator prefix="root_" type="password"
    name="administration" typename="password" zerogen="false"
    min="16" max="32" chars="[:alnum:]" %}}

*/}}
{{ $prefix := .Get "prefix" }}
{{ $type := .Get "type" | default "password" }}
{{ $name := .Get "name" }}
{{ $type_name := .Get "typename" | default "password" }}
{{ $min := int ( .Get "min" | default "16" ) }}
{{ $max := int ( .Get "max" | default "32" ) }}
{{ $chars := .Get "chars" | default "[:alnum:]#$%&()*+,-./:<=>?@[\\]^_{|}~" }}
{{ $random_needed := "" }}
{{ $random_test := "" }}
{{- if not ( eq ( .Get "zerogen" ) "false" ) -}}
  {{ $random_needed = " (if needed)" }}
  {{ $random_test = ( printf "[ -z \"${%s%s}\" ] && \n  " $prefix $type ) }}
{{- end -}}

Generate a random {{$name}} {{$type_name}}{{$random_needed}}:

```bash
{{safeHTML $random_test}}{{ $prefix }}{{$type}}="$( command tr --complement --delete \
      '{{safeHTML $chars}}' \
      2>'/dev/null' {{safeHTML "<"}} '/dev/urandom' \
    | command head --bytes=$(( {{$min}} + ( ${RANDOM} % {{ add ( sub $max $min ) 1 }} ) ))
  )"
```
