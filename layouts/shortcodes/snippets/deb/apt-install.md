<!--
apt-install shortcode.
Call apt-get install for the given packages
usage: { {% snippets/deb/apt-install packages="software-one,software-two" %} }
-->
{{ $packages := ( split ( .Get "packages" ) "," ) }}

Install the software:

```bash
sudo apt-get 'install' {{- range $index, $package := $packages }} {{- if (and (not (eq $index 0)) (modBool $index 2)) }} \
 {{ end }} "{{$package}}" 
{{- end }}
```
