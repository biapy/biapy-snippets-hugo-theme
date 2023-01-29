{{ $prefix := .Get "prefix" }}
{{ $name := .Get "name" | default "the software" }}

Generate a `htpasswd` entry for {{ $name }}:

```bash
{{$prefix}}htpasswd="${{ htmlEscape "{" }}{{$prefix}}username}:$(
    command openssl 'passwd' -apr1 "${{ htmlEscape "{" }}{{$prefix}}password}"
  )"
```
