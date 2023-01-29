Detect installed PHP's version:

```bash
php_version="$( command php --version | \
  command grep --only-matching 'PHP [0-9]*\.[0-9]*' | \
  command cut --delimiter=' ' --fields=2 )"
```

<!-- php_version="$(readlink -f /usr/bin/php | cut -c 13-)" -->
