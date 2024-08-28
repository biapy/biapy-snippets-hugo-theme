{{/*

Set an apt repository keyring path environment variable.

Usage:

  {{% deb/gnupg-keyring-environment "keyring.gpg" %}}

or

  {{% deb/gnupg-keyring-environment keyring="keyring.gpg" %}}

CSpell:ignore gnupg keyrings

*/}}
{{- $keyring := .Get "keyring" | default (.Get 0 | default false) -}}
{{- if or (not $keyring) (ne 1 (.Params | len)) -}}
  {{-
    errorf
    "The %q shortcode requires 'keyring' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}

Install `gnupg` for keyring management:

```bash
sudo apt 'install' 'gnupg'
```

Create the local keyrings folder:

```bash
sudo mkdir --parent '/etc/apt/keyrings/' '/root/.gnupg' &&
  sudo chmod go-rwx '/root/.gnupg'
```

Set the keyring path:

```bash
keyring_path="/etc/apt/keyrings/{{ $keyring }}"
```
