---
original_id: requirements
id: version-v1.1.0-requirements
title: Requirements
---
    
Reaction is built with [Meteor](https://meteor.com) and requires [Node.js](https://nodejs.org/) (v4 or higher). See the instructions for your operating system below.

- [macOS](#macos)
- [Linux](#linux)
- [Windows](#windows)

## macOS

**Node.js**

<https://nodejs.org>

**Build Tools**

Install [Xcode](https://developer.apple.com/xcode/downloads/), then run `xcode-select --install`

**Meteor**

```sh
curl https://install.meteor.com/ | sh
```

**Homebrew**

```sh
# http://brew.sh/

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Git**

```sh
brew install git
```

**ImageMagick** _Optional_

```sh
brew install imagemagick
```

## Linux

**Node.js**

<https://nodejs.org/>

**Build Tools**

```sh
# Ubuntu/Debian

apt-get update

apt-get install -y --no-install-recommends build-essential bzip2 curl ca-certificates git graphicsmagick python
```

**Meteor**

```sh
curl https://install.meteor.com/ | sh
```

## Windows

**Node.js**

<https://nodejs.org/>

**Windows Build Tools 2015**

<https://github.com/felixrieseberg/windows-build-tools>

```sh
# requires admin privileges to install, open a command prompt as an Administrator

npm install -g windows-build-tools
```

**Git**

<https://github.com/git-for-windows/git/releases>

**Meteor**

<https://www.meteor.com/install>

**ImageMagick** _Optional_

<https://www.imagemagick.org/script/binary-releases.php#windows>

## MongoDB

[MongoDB](https://www.mongodb.org/) is bundled with the Meteor development environment, so you don't need to install it manually for local development. When the development server is running, you can connect to the local MongoDB instance on the port that is one higher than the port Meteor is running on (e.g. if Meteor is running on port 3000, MongoDB will be on port 3001). No credentials are required to connect to Mongo while running in development.

When using a production build or a standalone [MongoDB](https://www.mongodb.org/) server, make sure you are using **version 3.2** or higher.

### Error: “EMFILE, too many open files”
```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
```

See: http://stackoverflow.com/a/27982223
