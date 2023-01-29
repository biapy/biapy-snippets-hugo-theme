<!--
apt-key-remove shortcode.
Remove key containing the given name from /etc/apt/trusted.gpg
usage: { {% snippets/deb/apt-key-remove name="<domain.com>" %} }
-->
{{ $name := .Get "name" }}

Remove the repository key from `trusted.gpg`:

```bash
removed_key="$( sudo apt-key 'list' 2>'/dev/null' |\
  command grep --before-context=1 "{{$name}}" | \
  command head --lines=1 | \
  command sed -e 's/^[ ]*//' )"
[[ -n "${removed_key}" ]] && sudo apt-key 'remove' "${removed_key}"
```
