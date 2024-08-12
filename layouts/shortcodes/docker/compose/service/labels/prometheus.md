{{/*

Add a label to the service, signaling Prometheus to scrape its metrics.

Usage:

{{% docker/compose/service/labels/prometheus "service-name"
  "job-name" "service-name:9090" %}}

or

{{% docker/compose/service/labels/prometheus service="service-name"
  job="job-name" address="service-name:9090" %}}

or

{{% docker/compose/service/labels/prometheus service="service-name"
  job="job-name" instance= "example.domain.com"
  address="service-name:9090" scheme="https" metrics-path="/metrics"
  scrape-interval="5s" scrape-timeout="4s"
%}}

cSpell:ignore prometheus

*/}}
{{- $service := .Get "service" | default (.Get 0 | default false) -}}
{{- $job := .Get "job" | default (.Get 1 | default false) -}}
{{- $address := .Get "address" | default (.Get 2 | default false) -}}
{{- $scheme := .Get "scheme" | default "https" -}}
{{- $metrics_path := .Get "metrics-path" |
  default (.Get "metrics_path" | default "/metrics") -}}
{{- if or (not $service) (not $job) (not $address)
  (and (not .IsNamedParams) (ne 3 (.Params | len))) -}}
  {{-
    errorf ( printf "%s %s"
    "The %q shortcode requires 'service', 'job' and 'address' parameters."
    "It accepts 'instance', 'scheme', 'metrics-path', 'scrape-interval',"
    "and 'scrape-timeout' parameters. See %s"
    ) .Name .Position
  -}}
{{- end -}}

Enable Prometheus scrape of the `{{ $service }}` service's
`{{ $scheme }}://{{ $address }}{{ $metrics_path }}` metrics endpoint:

```bash
{{ partialCached "docker/yq-compose-file.md" . }} <<EOF
  ${labels_node:-".services.{{ $service }}.labels"}."prometheus-job" = "{{ $job }}"
| ${labels_node:-".services.{{ $service }}.labels"}."prometheus-address" = "{{ $address }}"
| ${labels_node:-".services.{{ $service }}.labels"}."prometheus-scheme" = "{{ $scheme }}"
| ${labels_node:-".services.{{ $service }}.labels"}."prometheus-metrics-path" = "{{ $metrics_path }}"
{{- range $name, $value := .Params }}
{{- if not (eq $name "service" "job" "address" "scheme" "metrics-path" "metrics_path") }}
| ${labels_node:-".services.{{ $service }}.labels"}."prometheus-{{ $name }}" = "{{ $value }}"
{{- end }}
{{- end }}
EOF
```
