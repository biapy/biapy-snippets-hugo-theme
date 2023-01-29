{{ $name := .Get "name" | default "${domain//./-}" }}

Set the project name:

```bash
project_name="{{$name}}"
```
