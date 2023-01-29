Detect if `sudo` is available (use `command` if not):

```bash
cmdProxy='command'
command type -f 'sudo' &>'/dev/null' && cmdProxy='sudo'
```
