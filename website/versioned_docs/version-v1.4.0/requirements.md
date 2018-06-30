---
id: version-v1.4.0-requirements
title: Requirements
original_id: requirements
---
    
Reaction is built with [Meteor](https://meteor.com) and requires [Node.js](https://nodejs.org/) (v4 or higher). See the instructions for your operating system below.

-   [macOS](#macos)
-   [Linux](#linux)
-   [Windows](#windows)

If you have node and npm already installed, install the [reaction-cli](https://www.npmjs.com/package/reaction-cli) from [npm](https://www.npmjs.com/).

```sh
# install CLI
npm install -g reaction-cli
```

`reaction -h` provides a list of commands.

## macOS

**Node.js**

<https://nodejs.org>

**Build Tools**

Install [Xcode](https://developer.apple.com/xcode/downloads/), then run `xcode-select --install`

**File Limits**

The Meteor development environment requires significantly more available files than are configured in macOS by default.

Without updating the available file limits you may see an error.

    Error: ENFILE: too many open files, scandir '/Users/you/Documents/reaction/xxxx'
        at Error (native)
        at Object.fs.readdirSync (fs.js:808:18)
        at Object.wrapper (/tools/fs/files.js:1586:35)
        at readDirectory

See: <http://stackoverflow.com/a/27982223>

Increase your file limits with these `terminal` commands.

```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
```

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

**ImageMagick**

ImageMagick installation is optional, but is highly recommended, as it is used for image resizing on upload.

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

```sh
# CentOS/RHEL

# build tools
yum groupinstall "Development Tools"

# add "Extra Packages for Enterprise Linux" repository for GraphicsMagick
yum install epel-release

yum install GraphicsMagick
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

**ImageMagick**

ImageMagick installation is optional, but is highly recommended, as it is used for image resizing on upload.

<https://www.imagemagick.org/script/binary-releases.php#windows>

## MongoDB

[MongoDB](https://www.mongodb.org/) is bundled with the Meteor development environment, so you don't need to install it manually for local development. When the development server is running, you can connect to the local MongoDB instance on the port that is one higher than the port Meteor is running on (e.g. if Meteor is running on port 3000, MongoDB will be on port 3001). No credentials are required to connect to Mongo while running in development.

No database is bundled with production deployments, so when using a production build or a standalone [MongoDB](https://www.mongodb.org/) server, make sure you are using **version 3.2** or higher.

Database connections can be defined as an environment variable.

```sh
MONGO_URL=mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```
