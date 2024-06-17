{{/*

Use GitHub API to detect the latest release name.

usage:

{{% snippets/github_release "user/project" %}}

or:

{{% snippets/github_release name="user/project" var="version" %}}

*/}}
{{- $name := .Get "name" | default ( .Get 0 | default false ) -}}
{{- $var := .Get "var" | default "version" -}}
{{- if not $name -}}
  {{-
    errorf
    "The %q shortcode requires 'name' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Detect `{{ $name }}` GitHub project's latest release `tag_name`:

```bash
{{ $var }}="$( command wget --quiet --output-document=- \
  'https://api.github.com/repos/{{ $name }}/releases/latest' \
  | command jq --raw-output '.tag_name' )"
```
