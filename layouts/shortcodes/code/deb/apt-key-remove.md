{{- $name := .Get "name" -}}
removed_key="$( sudo apt-key 'list' 2>'/dev/null' |\
  command grep --before-context=1 "{{$name}}" | \
  command head --lines=1 | \
  command sed -e 's/^[ ]*//' )"
[[ -n "${removed_key}" ]] && sudo apt-key 'remove' "${removed_key}"