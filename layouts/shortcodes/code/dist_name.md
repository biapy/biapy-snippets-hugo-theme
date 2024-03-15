dist_name="$(command lsb_release --id --short \
      | command tr '[:upper:]' '[:lower:]')"
