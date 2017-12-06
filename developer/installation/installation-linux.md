# Installation for Linux


## Install prerequisites:

### Install node
Download and run the installer from the [NodeJs site](https://nodejs.org)


### Install Build Tools and Package Requirements

For Ubuntu/Debian

```sh
apt-get update

apt-get install -y --no-install-recommends build-essential bzip2 curl ca-certificates git graphicsmagick python
```

For CentOS/RHEL

```sh
yum groupinstall "Development Tools"
# add "Extra Packages for Enterprise Linux" repository for GraphicsMagick
yum install epel-release  GraphicsMagick
```

### Install Meteor

```sh
curl https://install.meteor.com/ | sh
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
