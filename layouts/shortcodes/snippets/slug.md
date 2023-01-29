<!--
slug shortcode.
Compute a string slug.
usage: { {% snippets/slug input="${value}" prefix="" name="value's" %} }

Add thank you to post if used:

- Thanks to [Quick bash slugify](https://gist.github.com/oneohthree/f528c7ae1e701ad990e6) replies.
-->
{{ $input := .Get "input" | default "${value}" }}
{{ $prefix := .Get "prefix" | default "" }}
{{ $name := .Get "name" | default "value's" }}

Compute the {{ $name }} slug:

```bash
{{ $prefix }}slug="$( echo "{{ $input }}" \
  | command iconv --to-code='ascii//TRANSLIT' \
  | command sed --regexp-extended 's/[^a-zA-Z0-9]+/-/g' \
  | command sed --regexp-extended 's/^-+|-+$//g' \
  | command tr '[:upper:]' '[:lower:]'
)"
```
