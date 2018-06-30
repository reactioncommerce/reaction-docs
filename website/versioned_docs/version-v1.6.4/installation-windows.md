---
id: version-v1.6.4-installation-windows
title: Installation for Windows
original_id: installation-windows
---
    
## Install prerequisites:

**Note: These commands all assume you are running them from an administrator shell**

### Install Node
Download and run the installer from the [NodeJs site](https://nodejs.org)

### Install Chocolately

Visit the [Chocolatey site](https://chocolatey.org/install) and follow the instructions


### Install Git

```sh
choco install git
````

### Install Meteor
```sh
choco install meteor
```


### Install Windows Build Tools 2015

```sh
npm install -g windows-build-tools
```

### Install ImageMagick (Optional but recommended)

```sh
choco install imagemagick
```

## Install Reaction

### Install the Reaction command-line interface (CLI)

```sh
# install CLI
npm install -g reaction-cli
```

### Create your first Reaction project

We recommend creating a directory under your user directory

```sh
mkdir /Users/<your_user_name>/my-reaction-projects
cd /Users/<your_user_name>/my-reaction-projects
```


Do not run reaction from the `\Windows\system32` directory as you will not have the correct permissions


```sh
# clone Reaction, install NPM dependencies
reaction init
# change directory into new reaction project
cd reaction
```

If you don't want Reaction to be installed in the default `reaction` directory you can
specify a directory like
```sh
reaction init my-new-reaction-project
cd init my-new-reaction-project
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


last_tested: Dec-7-2017
