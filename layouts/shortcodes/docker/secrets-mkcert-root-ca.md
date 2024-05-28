{{/*

Install a copy of mkcert Certificate Authority public key as a Docker secret.

Usage:

{{% docker/secrets-mkcert-root-ca %}}

cSpell:ignore rootca CAROOT

*/}}
{{- if .Params -}}
  {{-
    errorf
    "The %q shortcode doesn't accept parameters. See %s"
    .Name .Position
  -}}
{{- end -}}

Add `mkcert`'s root Certificate Authority public key as a Docker secret:

```bash
command cp "$(command mkcert -CAROOT)/rootCA.pem" \
  "${compose_project_path}/secrets/mkcert-root-ca.secret"
```
