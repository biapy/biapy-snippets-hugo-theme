{{- $keylink := .Get "keylink" -}}
{{- $keyserver := .Get "keyserver" | default "hkps://keyserver.ubuntu.com" -}}
{{- $keys := .Get "keys" | default "" -}}
{{- if $keylink -}}
  command wget --quiet "{{ $keylink }}" \
      --output-document=- \
      | sudo gpg --no-default-keyring \
          --primary-keyring "${keyring_path}" \
          --import
{{- else if $keys -}}
  sudo gpg --no-default-keyring \
    --primary-keyring "${keyring_path}" \
    --keyserver '{{ $keyserver }}' \
    --recv-keys '{{ $keys }}'
{{- end -}}