{{ $keyring := .Get "keyring" }}

Install `gnupg` for keyring management:

```bash
sudo apt-get install 'gnupg'
```

Create the local keyrings folder:

```bash
sudo mkdir --parent '/usr/local/share/keyrings/' '/root/.gnupg'
sudo chmod go-rwx '/root/.gnupg'
```

Set the keyring path:

```bash
keyring_path="/usr/local/share/keyrings/{{ $keyring }}"
```
