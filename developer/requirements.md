# Requirements

<<<<<<< HEAD
Reaction is built using [Meteor](https://meteor.com) and requires [Node.js](https://nodejs.org/) (v4 or higher).

We recommend at least **2GB of memory** for Node and Reaction to run well.

## Required

### Node.js and npm

<https://nodejs.org>
=======
Reaction is built with [Meteor](https://meteor.com) and requires [Node](https://nodejs.org/), version 4.0 and higher. See the instructions installing the requirements for your operating system below.

-   [OS X](#os)
-   [Linux](#linux)
-   [Windows](#windows)
>>>>>>> update requirements for writing style

If you have Node and npm already installed, install the [reaction-cli](https://www.npmjs.com/package/reaction-cli) with:

```sh
npm install -g reaction-cli
```


<<<<<<< HEAD
### Meteor

`reaction-cli` will prompt you to install Meteor, if you have not already installed it.

```sh
curl https://install.meteor.com/ | sh
```

### Build Tools
=======
Check the list of commands with:
```sh
reaction -h
```

## OS X

**Node**

Follow the recommended installation instructions from [Node](https://nodejs.org).
>>>>>>> update requirements for writing style

**macOS**

Install [XCode](https://developer.apple.com/xcode/downloads/) and then run `xcode-select --install`

**File Limits**

The Meteor development environment requires significantly more available files than are configured in Mac by default.

Without updating the available file limits you may see this error:

    Error: ENFILE: too many open files, scandir '/Users/you/Documents/reaction/xxxx'
        at Error (native)
        at Object.fs.readdirSync (fs.js:808:18)
        at Object.wrapper (/tools/fs/files.js:1586:35)
        at readDirectory

See: <http://stackoverflow.com/a/27982223>

Increase your file limits with:

```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
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

<<<<<<< HEAD
### Linux
=======
**ImageMagick (optional)**

ImageMagick installation is optional, but is highly recommended for image resizing on upload.

```sh
brew install imagemagick
```

## Linux

**Node.js**

Follow the recommended installation instructions from [Node](https://nodejs.org).

**Build Tools**
>>>>>>> update requirements for writing style

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
yum install epel-release  GraphicsMagick
```

<<<<<<< HEAD
### Windows
=======
## Windows

**Node.js**

Follow the recommended installation instructions from [Node](https://nodejs.org).
>>>>>>> update requirements for writing style

**Windows Build Tools 2015**

Install [Window-Build-Tools](https://github.com/felixrieseberg/windows-build-tools) with:

```sh
# requires admin privileges to install, open a command prompt as an Administrator

npm install -g windows-build-tools
```

**Git**

Install [Git](https://github.com/git-for-windows/git/releases)

<<<<<<< HEAD
## Optional

### ImageMagick
=======
**Meteor**

Install [Meteor](https://www.meteor.com/install)

**ImageMagick (optional)**

ImageMagick installation is optional, but is highly recommended for image resizing on upload.
>>>>>>> update requirements for writing style

Install [ImageMagick](https://www.imagemagick.org/script/binary-releases.php#windows)

<<<<<<< HEAD
**Windows**

<https://www.imagemagick.org/script/binary-releases.php#windows>
=======
>>>>>>> update requirements for writing style

**macOS**

```sh
brew install imagemagick
```

## bcrypt

Installing a local native compiled version of `bcrypt` is optional, but may yield some performance benefits and is recommended for production environments.

    Note: you are using a pure-JavaScript implementation of bcrypt.
    While this implementation will work correctly, it is known to be
    approximately three times slower than the native implementation.
    In order to use the native implementation instead, run

      meteor npm install --save bcrypt

    in the root directory of your application.

## MongoDB

[MongoDB](https://www.mongodb.org/) is bundled with the Meteor development environment, so you don't need to install it manually for local development. When the development server is running, you can connect to the local MongoDB instance on the port that is one higher than the port Meteor is running on (e.g. if Meteor is running on port 3000, MongoDB will be on port 3001). No credentials are required to connect to Mongo while running in development.

No database is bundled with production deployments, so when using a production build or a standalone [MongoDB](https://www.mongodb.org/) server, make sure you are using **version 3.2** or higher.

Database connections can be defined as an environment variable:

```sh
MONGO_URL=mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```
