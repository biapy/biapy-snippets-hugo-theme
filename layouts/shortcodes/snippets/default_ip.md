Detect the default interface IP:

```bash
default_ip="$(command ip route show 'default' |
    command head --lines=1 |
    command cut --delimiter=' ' --fields=5 |
   command xargs -I{} ip addr show "{}" |
  command grep --perl-regex --only-matching 'inet \K[\d.]+')"
```
