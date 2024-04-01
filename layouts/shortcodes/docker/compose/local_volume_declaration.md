{{/*
docker/compose/local_volume_declaration shortcode.
Add a local volume to docker-compose.yml file.
usage:
- default volume (`${project_name}_data`):
  { {% docker/compose/local_volume_declaration / %} }
- custom volumes:
  { {% docker/compose/local_volume_declaration %} }
  project_data:Volume comment
  oder_volume:Other volume comment
  { {% / docker/compose/local_volume_declaration %} }

*/}}
#### Volumes

Declare the volumes used by the stack:

```bash
while read -r 'volume_info'; do
  name="$(echo "${volume_info}" | command cut --delimiter=':' --fields=1)"
  comment="$(echo "${volume_info}" | command cut --delimiter=':' --fields=2)"
  [[ -n "${name}" ]] && \
    command yq --inplace 'eval(load_str("/dev/stdin"))' \
      "${compose_project_path}/docker-compose.yml" << EOF
with(.volumes.${name};
  .driver = "local"
  | . head_comment = "${comment}"
)
EOF
done {{ safeHTML "<<" }} EOF
{{- .Inner | default "${project_name}_data:Project data storage." -}}
EOF
```
