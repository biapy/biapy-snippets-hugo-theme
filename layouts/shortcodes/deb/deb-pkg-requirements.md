{{ $package := .Get "package" }}

Install the software requirements:

```bash
IFS=', ' read -r -a 'packages' {{ safeHTML "<" }} \
  {{ safeHTML "<" -}}(command dpkg --info "{{- $package -}}" | \
    command grep 'Depends:' | \
    command cut --delimiter=' ' --fields=3- | \
    command sed -e 's/ ([^)]*)//g' )
sudo apt install "${packages[@]}"
```
