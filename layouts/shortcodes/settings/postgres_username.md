{{ $name :=  .Get "name" | default (.Get 0) | default "postgres" }}
Set PostgreSQL administration username:

```bash
postgres_username="{{ $name }}"
```
