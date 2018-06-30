---
id: version-v1.6.4-installation-linux
title: Installation for Linux
original_id: installation-linux
---
    

## Install prerequisites:

### Install Node
Follow the instructions at [NodeJs site](https://nodejs.org)

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

**Note that the first run can take a while as it downloads dependencies. This is especially true if you are not in North America**

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_

By default the username will be :`admin@localhost` and the password will be: `r3@cti0n`

![](/assets/guide-installation-default-user.png)


Congrats! Now you've created your first Reaction store. View the store by going to http://localhost:3000 in your favorite browser.

To terminate `reaction` use `CTRL-c`.

To learn how to manage your store as an admin user visit the [admin documentation](dashboard.md)

To learn how to customize Reaction visit the [Customization Guide](tutorial.md)

last_tested: Dec-8-2017



