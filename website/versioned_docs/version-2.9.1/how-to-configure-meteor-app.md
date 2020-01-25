---
id: version-2.9.1-how-to-configure-meteor-app
title: How To: Configure the Meteor app
original_id: how-to-configure-meteor-app
---

The Reaction Meteor app can be configured on startup with a combination of environment variables and default data files for store pre-configuration.

Reaction uses `/private/settings/reaction.json` for the configuration of Reaction and [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) for initial administrator and server setup.

## Environment variables

You should use [environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps#how-the-environment-and-environmental-variables-work) for settings, useful for headless and automated virtual machine configuration.

You can also assign these variables before the `reaction` command.

### REACTION\_

The `REACTION_EMAIL`, `REACTION_USER`, `REACTION_AUTH` environment variables will configure the default administrator account.

```sh
export ROOT_URL=""
export MONGO_URL="<your mongodb connect string>"
export MAIL_URL="<smtp connection string>"

export REACTION_USER="<username>"
export REACTION_AUTH="<password>"
export REACTION_EMAIL="<login email>"
```

### REACTION_LOG_LEVEL

Set the Reaction [logging level](logging.md). Defaults to `info`.

```sh
 REACTION_LOG_LEVEL="DEBUG" reaction
```

### MONGO_URL

Provide a [standard connection string for mongoDB](https://docs.mongodb.com/manual/reference/connection-string/).

```sh
MONGO_URL=mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

During development, mongoDB is installed and running locally, and can be accessed on the port above the http port. Use [RoboMongo](https://robomongo.org/) and create a connection to `localhost:3001`, or `meteor mongo` on the CLI to access the local mongoDB instance. The default database is `meteor`.

### ROOT_URL

Export `ROOT_URL` and Reaction will update the domain in the `Shops` collection to match the domain from `ROOT_URL`. This lets you use alternate domains, or enforce SSL on a fresh installation. An empty `ROOT_URL` will just default to `localhost`.

### MAIL_URL

To send email you should pre-configure the administrative SMTP email server from `reaction.json` or using [env MAIL_URL variables](https://docs.meteor.com/api/email.html#Email-send).

Reaction supports sending mail over SMTP; the `MAIL_URL` environment variable should be of the form `smtp://USERNAME:PASSWORD@HOST:PORT`.

The Email dashboard provides a UI for quick configuration of the email server as well.

## Initialization

Reaction application configuration is loaded on startup from `/private/settings/reaction.json`.

Use `reaction.json` to provide an initial pre-configuration of Reaction. This will not overwrite values that have been changed in existing data, but will add new or missing data.

**/private/settings/reaction.json**

```json
[
  [
    {
      "name": "core",
      "enabled": true,
      "settings": {
        "public": {
          "allowGuestCheckout": true
        },
        "mail": {
          "user": "",
          "password": "",
          "host": "",
          "port": 587
        },
        "openexchangerates": {
          "appId": ""
        },
        "services": [
          {
            "facebook": {
              "appId": "",
              "secret": ""
            }
          }
        ]
      }
    },
    {
      "name": "reaction-google-analytics",
      "enabled": false,
      "settings": {
        "public": {
          "api_key": ""
        }
      }
    },
    {
      "name": "reaction-stripe",
      "enabled": true,
      "settings": {
        "api_key": ""
      }
    },
    {
      "name": "reaction-social",
      "enabled": true,
      "settings": {
        "public": {
          "autoInit": true,
          "appsOrder": ["facebook", "twitter", "pinterest", "googleplus"],
          "iconOnly": true,
          "faSize": "fa-2x",
          "faClass": "square",
          "targetWindow": "_self",
          "apps": {
            "facebook": {
              "appId": "",
              "version": "v2.1",
              "profilePage": "",
              "enabled": true,
              "appSecret": ""
            },
            "twitter": {
              "enabled": true
            },
            "googleplus": {
              "enabled": true
            },
            "pinterest": {
              "enabled": true
            }
          }
        }
      }
    }
  ]
]
```

_Note: Where `name` is Reaction package name, the `settings` object will update the `Packages` collection on every restart/reload._

## Default sample data

Reaction installs sample shop data, translations, and other fixture defaults from [`/private/data/`](https://github.com/reactioncommerce/reaction/tree/v2.9.1/private/data) and [`/private/data/i18n`](https://github.com/reactioncommerce/reaction/tree/v2.9.1/private/data/i18n) using the `Reaction.Import` class. You can see the provided data below:

- [Products.json](https://github.com/reactioncommerce/reaction/blob/v2.9.1/private/data/Products.json)
- [Shipping.json](https://github.com/reactioncommerce/reaction/blob/v2.9.1/private/data/Shipping.json)
- [Shops.json](https://github.com/reactioncommerce/reaction/blob/v2.9.1/private/data/Shops.json)
- [Tags.json](https://github.com/reactioncommerce/reaction/blob/v2.9.1/private/data/Tags.json)

You can overwrite or delete these import files to alter the default data. If altered, the changed data will be merged with existing documents, but changes in the database will not overwrite on restart if there are no changes.

_Note: the `private` prefix is automatically removed by the [Meteor Assets](http://docs.meteor.com/api/assets.html) method._

### Overwrite sample data

If you prefer to run `reaction` _without_ default sample data, set the `SKIP_FIXTURES` variable to `true`. Run `SKIP_FIXTURES=true reaction` or export the variable to set it for the life of that shell session:

```sh
export SKIP_FIXTURES=true
reaction
```

## Importing Data

The `Reaction.Importer` class provides import functionality.

See: [reaction-import.md](reaction-import.md) for documentation on `Reaction.Importer`.

_Example import of shipping records_

```js
import { Meteor } from "meteor/meteor";
import Reaction from "/imports/plugins/core/core/server/Reaction";

Meteor.startup(function() {
  Reaction.Importer.process(
    Assets.getText("data/Shipping.json"),
    ["name"],
    Reaction.Importer.shipping
  );
  Reaction.Importer.flush();
});
```

### loadSettings

```js
// server side secure import of settings
import { LoadSettings } from "/server/api";

LoadSettings(Assets.getText("settings/reaction.json"));
```

This `LoadSettings` method is made available in `server/api/core/index.js`. This is the method that Reaction uses to load package data on startup. This method can be used in custom plugins as well.
