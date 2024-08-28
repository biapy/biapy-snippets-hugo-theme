{{/*

Install an apt keyring.

Usage:

<!-- markdownlint-disable no-bare-urls -->

{{% deb/gnupg-keyring-install keylink="http://domain.com/keyring.gpg" %}}

or

{{% deb/gnupg-keyring-environment keyserver="hkps://keyserver.ubuntu.com"
  keys="\<keyring-id>" %}}

CSpell:ignore gnupg keylink keyserver hkps --recv-keys

*/}}
{{- $keylink := .Get "keylink" | default false -}}
{{- $keyserver := .Get "keyserver" | default "hkps://keyserver.ubuntu.com" -}}
{{- $keys := .Get "keys" | default false -}}
{{- if and (not $keylink) (not $keys) -}}
  {{-
    errorf
    "The %q shortcode requires one of 'keylink' or 'keys' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Install the encryption keys signing the software apt repository:

```bash
{{ if $keylink -}}
command wget --quiet "{{ $keylink }}" \
  --output-document=- |
  sudo gpg --no-default-keyring --import \
        --primary-keyring "${keyring_path}"
{{ else if $keys -}}
sudo gpg --no-default-keyring --keyserver '{{ $keyserver }}' \
  --primary-keyring "${keyring_path}" \
  --recv-keys '{{ $keys }}'
{{ end -}}
```
