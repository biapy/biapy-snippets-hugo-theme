{{ $envfile := .Get "envfile" | default "${compose_project_path}/${project_name}.env" }}

If the stack is deployed via Portainer, include the environment settings
in the compose file as environment variables instead of loading the environment
from file:

```bash
command sed -i -e '/env_file:/,$d' \
  "${compose_project_path}/docker-compose.yml"
command tee -a "${compose_project_path}/docker-compose.yml" {{ safeHTML "<<" }} EOF
    environment:
      # Dummy value, to prevent error when no environment variable is needed.
      PORTAINER_STACK: "true"
$(command sed \
  -e 's/^\([^#=]*\)=.*$/\1: "\${\1}"/' \
  -e 's/^/      /' \
  "{{ $envfile }}")
EOF
```

Paste the content of the stack environment file in Portainer stack editor
"Environment variables" advanced mode field.
