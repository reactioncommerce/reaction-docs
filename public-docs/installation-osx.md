---
id: installation-osx
title: Installation for OSX
---
    
[![Installation Video](/assets/guide-installation-video-screenshot.png)](https://www.youtube.com/watch?v=PkFDX8NWskY)

## Install prerequisites

### Install Node

Download and run the installer from the [Node.js site](https://nodejs.org) for the latest long-term support (LTS) version, 8.

**Note:** Reaction is currently not compatible with Node 9.

### Install Xcode

Download and run the installer from [Apple Developer Site](https://developer.apple.com/download/)

Then from the command line run

```sh
xcode-select --install
```

### Install Homebrew

(If you are uncomfortable just running a random script from Github, you can also visit the [Homebrew site](http://brew.sh/))

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install Git

```sh
brew install git
```

### Install Meteor

```sh
curl https://install.meteor.com/ | sh
```

### Increase your open file limit

The Meteor development environment requires significantly more available files than are configured in macOS by default. [Follow the instructions here to fix this.](https://gist.github.com/abernix/a7619b07b687bb97ab573b0dc30928a0)

## Install Reaction

### Install the Reaction command-line interface (CLI)

```sh
# install CLI
npm install -g reaction-cli
```

### Create your first Reaction project

```sh
# clone Reaction, install NPM dependencies
reaction init
# change directory into new Reaction project
cd reaction
```

If you don't want Reaction to be installed in the default `reaction` directory you can
specify a directory like

```sh
reaction init my-new-reaction-project
```

### Start Reaction

To start Reaction, run the `reaction` command

```sh
# start Reaction
reaction
# or
reaction run
```

**Note**: The first run can take a while as it downloads dependencies. This is especially true if you are not in North America.

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_ By default the username will be `admin@localhost` and the password will be: `r3@cti0n`

![](/assets/guide-installation-default-user.png)

Congrats! Now you've created your first Reaction shop. View the shop by going to <http://localhost:3000> in your favorite browser.

To terminate `reaction` use `CTRL-c`.

To learn more about the Reaction command-line-client visit the [CLI docs](reaction-cli.md)

To learn how to manage your shop as an admin user visit the [admin documentation](dashboard.md)

To learn how to customize Reaction visit the [Customization Guide](tutorial.md)

last_tested: Dec-7-2017
