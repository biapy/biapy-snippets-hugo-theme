{{/*
add-ppa shortcode.
Call add-apt-repository for the given PPA
usage: { {% snippets/deb/add-ppa ppa="ppa:username/software" %} }
*/}}
{{ $ppa := .Get "ppa" }}

Add the software PPA (Personal Package Archive) to `apt` configuration:

```bash
sudo add-apt-repository '{{$ppa}}'
```
