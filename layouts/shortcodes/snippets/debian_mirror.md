Detect the used download mirror:

```bash
debian_mirror="$(command awk \
    "/^deb[ \t].*[ \t]$(command lsb_release -cs)[ \t].*main.*/{ print \$2; exit }" \
    '/etc/apt/sources.list')"
```