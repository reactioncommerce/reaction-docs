# Installation

Developers using **Windows** should review the [Windows specific installation requirements for Meteor and Reaction](https://docs.reactioncommerce.com/reaction-docs/development/requirements).

To install and run Reaction locally:

```bash
git clone https://github.com/reactioncommerce/reaction.git
cd reaction
./reaction install
```

Installs Meteor, Node, NPM if necessary and then starts the most recent `development` branch of Reaction locally.

The `master` branch contains the latest published releases, and also should work with current packages from the [Meteor package manager](https://atmospherejs.com/).

When using the `master` branch with development packages and versions of published packages (versus local packages), you may get some package compatibility warnings. You can use `--allow-incompatible-update` to resolve this.

See the [package documentation](developer/packages/packages.md) for details on working with the `development` branch, and using local package dependencies. You can clone or create new packages in `reaction/packages` for local package development.

## reaction install

```
./reaction install
```

This command runs the `bin/install` script that installs Meteor, Node, NPM and starts `reaction`. ![](/assets/guide-installation-default-user.png)

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_

Sample data is loaded on a new installation from [`reactioncommerce:reaction-sample-data`](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-sample-data).

Browse to [http://localhost:3000](https://localhost:3000) and you should see Reaction running.

## reaction
To start Reaction, run the `reaction` command

```
./reaction
```

`/reaction` runs a script that executes `meteor`.

 It appends `--raw-logs` and uses the `settings/dev.settings.json` configuration by default. If you create a `settings/settings.json` it will use this file instead of the default.

_The initial admin user for the site is auto generated, and displayed in your console (or see: env variables section to default these)_

Browse to [http://localhost:3000](https://localhost:3000) and you should see Reaction running.

To terminate `reaction` use `CTRL-c`.

This command also allows [Meteor command line options](http://docs.meteor.com/#/full/meteorhelp).

## reaction pull

```bash
./reaction pull
```

You can just use `git pull`, but `reaction pull` will run `bin/clone-packages.sh`, a script that pulls all local packages as well as Reaction. It's the easiest way to make sure you're working with the complete developer package set.

```bash
cd reaction
./reaction pull
./reaction
```

You can also use `meteor upgrade` to upgrade to the latest Atmosphere published packages.

## reaction reset
To reset the Reaction database, and optionally removes bower packages.

This will give you a fresh test dataset from [`reactioncommerce:reaction-sample-data`](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-sample-data).

```
./reaction reset
```

See the [package development documentation](/developer/packages/packages.md)  and the [settings and import documentation](/developer/core/import.md) for detailed instructions on modifying initial fixture data.

## meteor
You can use any [meteor command line](http://docs.meteor.com/#/full/commandline) methods as well.

```sh
curl https://install.meteor.com/ | sh
git clone https://github.com/reactioncommerce/reaction.git
cd reaction
git pull
meteor reset
meteor --raw-logs --settings settings/dev.settings.json
```
