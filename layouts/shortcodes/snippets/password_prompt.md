<!--
password_prompt shortcode.
Add a prompt for user to provide a password for given usage.
usage: { {% snippets/password_prompt prefix="root_" name="administration" zerogen="false" %} }
-->
{{ $prefix := .Get "prefix" }}
{{ $name := .Get "name" }}
{{ $random_desc := "" }}
{{ $random_prompt := "" }}
{{ $random_action := "" }}
{{- if not ( eq (.Get "zerogen") "false" ) -}}
  {{ $random_desc = " (optional, randomly generated if empty)" }}
  {{ $random_prompt = " (leave empty to generate random password)" }}
  {{ $random_action = " A random password will be generated." }}
{{- end -}}

Set the {{$name}} password{{$random_desc}}:

```bash
command read -s -p 'Enter the {{$name}} password{{$random_prompt}}:' '{{$prefix}}password' \
  && command echo \
  && if [ -n "${{ htmlEscape "{" }}{{$prefix}}password}" ]; then
    command read -s -p 'Please confirm the password:' 'confirm_password'
    command echo
    if [ "${{ htmlEscape "{" }}{{$prefix}}password}" != "${confirm_password}" ]; then
      {{$prefix}}password=''
      command echo "Error: passwords do not match.{{$random_action}}"
    fi
  fi
```
