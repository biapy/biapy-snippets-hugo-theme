{{- $packages := ( split ( .Get "packages" ) "," ) -}}
sudo apt-get --assume-yes 'install' {{- range $index, $package := $packages }} "{{$package}}"  {{- if not (modBool $index 2) }} \
 {{end -}}
{{- end }}