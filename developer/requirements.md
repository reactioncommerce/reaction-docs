# Requirements

## macOS

- To install the required build tools, Mac users must install [Xcode](https://developer.apple.com/xcode/downloads/), then run `xcode-select --install`
- [Node.js](https://nodejs.org/) >=4.x.x (with NPM)
- `ImageMagick` - _Optional_

## Linux

- [Node.js](https://nodejs.org/) >=4.x.x (with NPM)
- `graphicsmagick` - _Optional_

### Ubuntu/Debian

```sh
apt-get update

apt-get install -y --no-install-recommends curl ca-certificates bzip2 git build-essential python graphicsmagick
```

## Windows

Windows installation has a few more requirements:

- [Node.js](https://nodejs.org/) >=4.x.x (with NPM)
- Win32 OpenSSL ([windows installer](https://slproweb.com/products/Win32OpenSSL.html)) (See [npm-node-aes-gcm/README.md](https://github.com/meteor/meteor/blob/devel/packages/non-core/npm-node-aes-gcm/README.md))
- [Microsoft Build Tools 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48159)
- Git + msysGit ([git-for-windows/git](https://github.com/git-for-windows/git/releases))
- [Meteor](https://install.meteor.com/windows)
- ImageMagick

If you want to use shell scripts under Windows, create file named `meteor` inside `%localappdata%\.meteor` with following contents:

```sh
!/bin/sh
cmd //c "$0.bat" "$@"
```

Run shell scripts from `Git Bash`.

For example:

```sh
cd reaction
.reaction/scripts/clone-packages.sh
```

## MongoDB

[MongoDB](https://www.mongodb.org/) is bundled with the developer environment, you don't need to install it.

When using a production build or a standalone [MongoDB](https://www.mongodb.org/) server, make sure you are using **version 3.2** or better.

You can connect to the local Meteor / MongoDB instance on the `Meteor port + 1` (e.g. if Meteor port is 3000, MongoDB port is 3001). No credentials required for Mongo in development. The default database for development is `meteor`.

## Troubleshooting

### env: node: No such file or directory

Caused by a broken Node/NPM installation. Reinstall [Node.js](https://nodejs.org/) with NPM (or when packaged separately, reinstall them both).

### Windows OpenSSL errors prevent startup

Install OpenSSL per: <https://github.com/meteor/meteor/tree/release-1.4.0.2/packages/non-core/npm-node-aes-gcm/README.md>

### Error: “EMFILE, too many open files”
```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
```

See: http://stackoverflow.com/a/27982223
