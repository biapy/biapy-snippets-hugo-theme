{{/*

Set `mkcert_root_ca` environment variable with the path of the user `mkcert`
root Certificate Authority.

Usage:

  {{% mkcert/root_ca %}}

*/}}

Detect the path of `mkcert` root CA public key:

```bash
mkcert_root_ca="$(command mkcert -CAROOT)/rootCA.pem"
```
