---
id: version-v1.2.0-installation
title: Installation
original_id: installation
---
    
Review and install the [Reaction requirements.](https://docs.reactioncommerce.com/reaction-docs/development/requirements).

To install and run Reaction locally in development mode:

```sh
# install CLI
npm install -g reaction-cli

# clone Reaction, install NPM dependencies
reaction init

# move into the new app directory
cd reaction
```

## reaction

To start Reaction, run the `reaction` command

```sh
# start Reaction
reaction
# or
reaction run
```

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_ ![](/assets/guide-installation-default-user.png)

Sample data is loaded on a new installation from `private/data`. This can take some time depending on your system.

Browse to [http://localhost:3000](https://localhost:3000) and you should see Reaction running.

To terminate `reaction` use `CTRL-c`.

The `reaction` command line also accepts [Meteor command line options](http://docs.meteor.com/#/full/meteorhelp).

`reaction` appends some commands to the default `meteor` command, it adds `--raw-logs` and uses the `settings/dev.settings.json` configuration by default. If you create a `settings/settings.json` it will use this file instead of the default.

### reaction --help

`reaction -h` will give you help for the `reaction` command.

```sh
reaction -h
reaction <command> [options]

Commands:
  init      Create a new Reaction app (will create a new folder)
  config    Get/set config values
  run       Start Reaction in development mode
  debug     Start Reaction in debug mode
  test      Run integration or unit tests
  pull      Pull Reaction updates from Github and install NPM packages
  update    Update Atmosphere and NPM packages
  up        Update Atmosphere and NPM packages
  reset     Reset the database and (optionally) delete build files
  plugins   Manage your Reaction plugins
  styles    Manage your Reaction styles (css, less, stylus, scss)
  build     Build a production Docker image
  register  Register an account with Reaction
  login     Login to Reaction
  whoami    Check which account you are logged in as
  keys      Manage your SSH keys
  apps      Manage your apps deployments
  deploy    Deploy an app
  env       Manage environment variables for an app deployment
  domains   Add a custom domain name to a deployment
  open      Open an app deployment in your browser

Options:
  -v, --version  Show version number
  -h, --help     Show help
```

## reaction pull

```sh
reaction pull
```

You could just use `git pull`, but `reaction pull` will update npm modules and other dependencies.

## reaction reset

Resets the Reaction database, updates npm modules, and optionally removes `node_modules` before updating.

This will give you a fresh test dataset from `private/data`.

```sh
reaction reset
```

See the [package development documentation](packages.md) and the [settings and import documentation](reaction-import.md) for detailed instructions on modifying initial fixture data.
