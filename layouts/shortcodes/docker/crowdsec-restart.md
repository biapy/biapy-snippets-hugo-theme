{{/*

Restart CrowdSec agent:

Usage:

{{% docker/crowdsec-restart %}}

<!-- CSpell:ignore crowdsec -->
<!-- vale Microsoft.Terms = NO -->

*/}}

Restart CrowdSec agent:

```bash
docker compose --file="${compose_path:-"${HOME}/docker-compose"}/crowdsec/compose.yml" \
    restart 'crowdsec-agent'
```
