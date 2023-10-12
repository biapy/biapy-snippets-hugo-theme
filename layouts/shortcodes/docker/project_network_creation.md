{{ $project_name := .Get "name" | default "${project_name}" }}

### Project network

Create the project network:

```bash
[[ -z "$( command docker network ls --quiet --filter="name={{ $project_name }}-net" )" ]] &&
  command docker network create --driver "${network_driver}" \
    --label "com.docker.stack.namespace=${project_name}" \
    --label "com.docker.compose.network=default" \
    --label "com.docker.compose.project=${project_name}" \
    --attachable "{{ $project_name }}-net"
```
