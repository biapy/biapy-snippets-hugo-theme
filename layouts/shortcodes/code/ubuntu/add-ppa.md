{{/*

Call add-apt-repository for the given PPA

Usage:

{{% deb/add-ppa "ppa:username/software" %}}

or

{{% deb/add-ppa ppa="ppa:username/software" %}}

*/}}
{{- $ppa := .Get "ppa" | default (.Get 0) -}}
sudo add-apt-repository "{{$ppa}}"