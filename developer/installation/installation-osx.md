# Installation for OSX

[![Installation Video](/assets/guide-installation-video-screenshot.png)](https://www.youtube.com/watch?v=PkFDX8NWskY)

## Install prerequisites:

### Install node
Download and run the installer from the [NodeJs site](https://nodejs.org)

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
````

### Install Meteor

```sh
curl https://install.meteor.com/ | sh
```

### Increase your open file limit

The Meteor development environment requires significantly more available files than are configured in macOS by default.

See: <http://stackoverflow.com/a/27982223>

Increase your file limits with these `terminal` commands.

```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
echo "ulimit -n 65536 65536" >> .bashrc
source .bashrc
```

## Install Reaction

### Install the Reaction command line client

```sh
# install CLI
npm install -g reaction-cli
```

### Create your local Reaction installation

```sh
# clone Reaction, install NPM dependencies
reaction init
cd reaction
```

If you don't want Reaction to be installed in the default `reaction` directory you can
specify a direction like
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

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_

![](/assets/guide-installation-default-user.png)

Sample data is loaded on a new installation from `private/data`. This can take some time depending on your system.

Browse to [http://localhost:3000](https://localhost:3000) and you should see Reaction running.

To terminate `reaction` use `CTRL-c`.

The `reaction` command line also accepts [Meteor command line options](http://docs.meteor.com/#/full/meteorhelp).

`reaction` appends some commands to the default `meteor` command, it adds `--raw-logs` and uses the `settings/dev.settings.json` configuration by default. If you create a `settings/settings.json` it will use this file instead of the default.


### More commands

#### reaction --help

`reaction -h` will give you help for the `reaction` command.


#### reaction pull

```sh
reaction pull
```

You could just use `git pull`, but `reaction pull` will update npm modules and other dependencies.

#### reaction reset

Resets the Reaction database, updates npm modules, and optionally removes `node_modules` before updating.

This will give you a fresh test dataset from `private/data`.

```sh
reaction reset
```


To just reset the database you can run

```bsh
reaction reset -n
```

See the [package development documentation](/developer/packages/packages.md) and the [settings and import documentation](/developer/core/import.md) for detailed instructions on modifying initial fixture data.
