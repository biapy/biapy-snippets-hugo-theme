<!--
random_port shortcode.
Select a random available port
usage: { {% snippets/random_port prefix="random_" %} }
-->
{{ $prefix := .Get "prefix" | default "random_" }}

Select a random available port:

```bash
# Read available port range.
read 'port_range_start' 'port_range_end' \
    < '/proc/sys/net/ipv4/ip_local_port_range'
while true; do
    # Select a random port.
    {{$prefix}}port="$( command shuf \
        --input-range="${port_range_start}-${port_range_end}" \
        --head-count=1 )"
    # Check that port is availabe.
    command ss --listening --numeric \
        | command grep --quiet ":${{ safeHTML "{" }}{{$prefix}}port}" \
        || break
done
```
