{{/*
user_password_prompt shortcode.
Add a username setting.
Add a prompt for user to provide a password for username.
usage: { {% snippets/user_password_prompt prefix="root_" name="administration" zerogen="false" %} }
*/}}
{{ $prefix := .Get "prefix" }}
{{ $name := .Get "name" }}
{{ $username := .Get "username" | default "admin" }}
{{ $random_desc := "" }}
{{ $random_prompt := "" }}
{{ $random_action := "" }}
{{- if not ( eq (.Get "zerogen") "false" ) -}}
  {{ $random_desc = " (optional, randomly generated if not provided)" }}
  {{ $random_prompt = " (leave empty to generate a random password)" }}
  {{ $random_action = " A random password will be generated." }}
{{- end -}}

Set the {{$name}} username:

```bash
{{$prefix}}username='{{ $username }}'
```

Set the {{$name}} password{{$random_desc}}:

```bash
command read -s -p 'Enter '${{ "{" }}{{$prefix}}username}' account password{{$random_prompt}}:' '{{$prefix}}password' \
  && command echo \
  && if [ -n "${{ "{" }}{{$prefix}}password}" ]; then
    command read -s -p 'Please confirm password:' 'confirm_password'
    command echo
    if [ "${{ "{" }}{{$prefix}}password}" != "${confirm_password}" ]; then
      {{$prefix}}password=''
      command echo "Error: passwords do not match.{{$random_action}}"
    fi
  fi
```
