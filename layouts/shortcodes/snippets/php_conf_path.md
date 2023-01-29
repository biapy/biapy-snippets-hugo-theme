Detect the path to PHP configuration files:

```bash
[[ -d '/etc/php5' ]] && php_conf_path='/etc/php5'
[[ -d "/etc/php/${php_version}" ]] && php_conf_path="/etc/php/${php_version}"
```
