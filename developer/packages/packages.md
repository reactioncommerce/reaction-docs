# Packages
Reaction packages are Meteor packages that add a call to `ReactionCore.registerPackage` declaring the package structure to the Reaction registry.

- [Core Packages](#core-packages)
- [Public packages](#public-packages)
- [Private packages](#private-packages)
- [ReactionCore.registerPackage](#reactioncoreregisterpackage)


## Core Packages
For local core package development you must _git clone_ packages locally, either into `reaction/packages`, or define the `PACKAGE_DIRS` env variable for an alternate location.

The `bin/clone-packages.sh` is a helper script that will clone all current reactioncommerce:* packages into the PACKAGE_DIRS location.

First set your PACKAGE_DIRS variable:

```bash
export PACKAGE_DIRS="/Users/path/to/your/packages"
```

By default, if the `PACKAGE_DIRS` ENV variable is not set, we'll assume `PACKAGE_DIRS="~/reaction/packages"`.

Checkout Reaction and execute `clone-packages.sh`.

```bash
cd ~
git clone https://github.com/reactioncommerce/reaction.git
cd reaction
./bin/clone-packages.sh
meteor --settings settings/dev.settings.json
```

This is our recommended practice, and ensure you are working with the default branches (development) for all the Reaction packages.

_Note: Pull requests are happily accepted, please make your GitHub pull request a merge to the `development` branch, and not master._

_Tip: Copy the `settings/dev.settings.json` to `settings/settings.json` and edit the file to retain authentication and Meteor settings between `meteor reset`. Start with `meteor --settings settings/settings.json --raw-logs`_

## Public packages
If you create a package and would like to share it with the Meteor community, you can publish the package to the Meteor package registry with `meteor publish`.

_Publishing packages is not a requirement to share or deploy packages._

If you would like to share a package in the registry, but don't want to be responsible for long term ownership of the package, create an issue and let us know. We can also fork and maintain a [Reaction Commerce published org version of your package](https://atmospherejs.com/reactioncommerce).

## Private packages
Packages within Reaction are Meteor packages. There are private packages, that a developer can create to customize any of Reaction's functionality. Private packages can be deployed by including them in the `packages` folder.

**Create packages**

```
meteor create --package
```

See [Meteor docs](https://docs.meteor.com/#/full/writingpackages) for additional help creating packages.

**Update package.js**

Once you have created your added, cloned, or symlinked your package development folder to the `reaction/packages` directory, you'll continue creating a standard Meteor package by defining `package.js`, starting with a describe block:

```javascript

Package.describe({
  summary: "Reaction Hello World - example package for Reaction",
  name: "reactioncommerce:reaction-helloworld",
  version: "0.1.0",
  git: "https://github.com/reactioncommerce/reaction-helloworld.git"
});

Package.onUse(function (api, where) {
  api.use("reactioncommerce:core@x.x.x"); //current release
  api.addFiles("server/register.js",'server');
});
```

Where name is the `org-user:packagename` that you will use to publish this package to the Meteor registry. See: [Meteor package.js docs](https://docs.meteor.com/#/full/packagejs).

Any files you create in your package you will need to add in your [package.js](https://docs.meteor.com/#/full/packagejs) file.

```javascript
api.addFiles('myfile');
```

To test your package, add it to your application :

```
meteor add your-new-package
```

_Tip: You can also add and remove packages by editing `.meteor/packages`_

### ReactionCore.registerPackage
The `ReactionCore.registerPackage` method describes a Meteor package to other Reaction packages.

Note: The registry entries load does not overwrite existing package entries in the `Packages` collection. However, if there is a package settings object, these entries will be refreshed on change. You'll need to either clear the `Packages` collection, or do a `meteor reset` to re-write other changes to a package registry entry.

Integrate packages with reaction-core by adding **server/register.js**

```javascript
ReactionCore.registerPackage({
  label: 'PayPal',
  name: 'reaction-paypal',
  autoEnable: false,
  registry: [
    {
      provides: 'dashboard',
      label: 'PayPal',
      description: 'PayPal Payment for Reaction Commerce',
      icon: 'fa fa-paypal',
      cycle: '3',
      container: 'reaction-paypal'
    }, {
      label: 'PayPal Settings',
      route: 'paypal',
      provides: 'settings',
      container: 'reaction-paypal',
      template: 'paypalSettings'
    }, {
      template: 'paypalPaymentForm',
      provides: 'paymentMethod'
    }
  ],
  permissions: [
    {
      label: 'PayPal',
      permission: 'dashboard/payments',
      group: 'Shop Settings'
    }
  ]
});
```