{{/*

Call add-apt-repository for the given PPA

Usage:

{{% deb/add-ppa "ppa:username/software" %}}

or

{{% deb/add-ppa ppa="ppa:username/software" %}}

*/}}
{{ $ppa := .Get "ppa" | default (.Get 0) }}

Add the software PPA (Personal Package Archive) to `apt` configuration:

```bash
sudo add-apt-repository "{{$ppa}}"
```
