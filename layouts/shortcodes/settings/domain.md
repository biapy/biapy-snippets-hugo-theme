{{ $sub := .Get "sub" | default (.Get 0) | default "${project_name}" }}

Set the software domain name:

```bash
domain="{{$sub}}.domain.com"
```
