{{- $ppa := .Get "ppa" -}}
sudo add-apt-repository '{{$ppa}}'