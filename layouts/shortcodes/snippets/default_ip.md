Detect the default interface IP:

```bash
default_ip="$(command ip addr show "$( command ip route show  'default' \
    | command head --lines=1 \
    | command cut --delimiter=' ' --fields=5 )" \
  | command grep --perl-regex --only-matching 'inet \K[\d.]+')"
```
