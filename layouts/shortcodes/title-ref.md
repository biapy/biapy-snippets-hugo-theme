{{/*

Generate a link to a page, with page title as link text.

usage:

{{% title-ref "path/page.md" %}}

or:

{{% title-ref path="path/page.md" %}}

<!-- CSpell:ignore titleref -->
<!-- markdownlint-disable reference-links-images -->

*/}}
{{- $path := .Get "path" | default (.Get 0 | default false) -}}
{{- if (not $path) -}}
  {{- errorf "The %q shortcode requires 'path' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
{{- with .Site.GetPage $path -}}
[{{ .Title }}]({{ .Permalink }})
{{- else -}}
{{ errorf "The %q shortcode reference a missing page. See %s" .Name .Position }}
{{- end -}}
