{{ $name := ( .Get "name" ) }}

### Project network

Create the project network:

```bash
[[ -n "${{ htmlEscape "{" }}{{ $name }}_network}" && \
  -z "$( command docker network ls --quiet \
        --filter="name=${{ htmlEscape "{" }}{{ $name }}_network}" )" ]] \
  && command docker network create --driver "${network_driver}" \
  --label "com.docker.stack.namespace=${project_name}" \
  --attachable "${{ htmlEscape "{" }}{{ $name }}_network}"
```
