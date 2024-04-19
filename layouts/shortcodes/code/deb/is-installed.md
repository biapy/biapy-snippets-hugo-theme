{{/*

Test if package status is 'installed'.

Usage:

```bash
{{% code/deb/is-installed "<package>" %}} && command echo "yes"
```

```bash
if [[ ! ({{% code/deb/is-installed name="<package>" %}}) ]]; then
 command echo "no"
fi
```

*/}}
{{- $name := .Get "name" | default (.Get 0) -}}
{{- if (not $name) -}}
  {{-
    errorf
    "The %q shortcode requires 'name' parameter. See %s"
    .Name .Position
  -}}
{{- end -}}
dpkg-query --showformat '${db:Status-Status}\n' --show "{{ $name }}" |
  command grep --quiet '^installed$'