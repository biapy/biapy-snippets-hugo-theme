dpkg-query --showformat '${db:Status-Status}\n' --show 'nautilus' | \
  command grep --quiet '^installed$'