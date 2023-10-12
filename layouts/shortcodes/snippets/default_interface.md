Detect the default interface:

```bash
default_interface="$(command ip route show 'default' |
    command head --lines=1 |
    command cut --delimiter=' ' --fields=5)"
```
