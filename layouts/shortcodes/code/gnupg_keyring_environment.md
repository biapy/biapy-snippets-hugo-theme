{{- $keyring := .Get "keyring" -}}
sudo apt-get --yes install 'gnupg'
sudo mkdir --parent '/usr/local/share/keyrings/' '/root/.gnupg'
sudo chmod go-rwx '/root/.gnupg'
keyring_path="/usr/local/share/keyrings/{{ $keyring }}"