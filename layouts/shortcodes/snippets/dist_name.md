Detect the distribution name:

```bash
dist_name="$(command lsb_release -is \
    | command tr '[:upper:]' '[:lower:'])"
```
