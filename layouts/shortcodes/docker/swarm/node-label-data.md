
Add a `${project_name}.data` label to each Docker Swarm node where this
Compose file's volumes are available
(via a distributed storage such as [Ceph](https://ceph.io/),
[Gluster](https://www.gluster.org/),
or [S3](https://github.com/s3fs-fuse/s3fs-fuse)):

```bash
[[ "${swarm_node}" = 'yes' ]] && \
  command docker node update --label-add "${project_name}.data=true" \
    "$(command docker info --format '{{ "{{" }}.Swarm.NodeID}}')"
```
