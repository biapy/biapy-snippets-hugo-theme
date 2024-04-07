{{/*

Ask for the "project_name" setting value.

Usage:

{{% settings/project_name "software-code" %}}

or

{{% settings/project_name name="software-code" %}}

*/}}
{{ $name := .Get "name" | default (.Get 0) | default "${domain//./-}" }}

Set the project name:

```bash
project_name="{{ $name }}"
```
