{{/*
Add to docker-compose.yml file the declaration of secrets used by the stack

usage: example for a secret named "${project_name}-${secret_name}:
{ {% docker/compose/secrets-declaration %} }
secret_name
{ {% / docker/compose/secrets-declaration %} }
*/}}

#### Configs declaration

Declare the Docker `config` used by the stack

```bash
while read -r 'file'; do
  command yq --inplace 'eval(load_str("/dev/stdin"))' \
    "${compose_project_path}/docker-compose.yml" << EOF
.configs."${file##*/}".file = "${file}"
EOF
done << EOF
{{- .Inner -}}
EOF
```
