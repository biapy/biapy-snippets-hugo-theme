{{ $name := .Get "name" | default (.Get 0) | default "${domain//./-}" }}

Set the project name:

```bash
project_name="{{$name}}"
```
