---
id: version-v1.2.0-configuration
title: Configuration
original_id: configuration
---
    
Reaction can be configured on startup with a combination of environment variables, `settings/settings.json`, and default data files that provide package and shop pre-configuration.

Reaction uses `/private/settings/reaction.json` for the configuration of Reaction packages and [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) for initial administrator and server setup.

## Environment

You can use [environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps#how-the-environment-and-environmental-variables-work) for settings, useful for headless and automated vm configuration.

Environment variables take priority over variables set in _settings.json_.

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

During development, mongoDB is installed and running locally, and can be accessed on the port above the http port.  Use [RoboMongo](https://robomongo.org/) and create a connection to `localhost:3001`, or `meteor mongo` on the CLI to access the local mongoDB instance. The default database is `meteor`.

### ROOT_URL

Export `ROOT_URL` and Reaction will update the domain in the `Shops` collection to match the domain from `ROOT_URL`. This lets you use alternate domains, or enforce SSL on a fresh installation. An empty `ROOT_URL` will just default to `localhost`.

### MAIL_URL

To send email you should pre-configure the administrative SMTP email server from `reaction.json` or using [env MAIL_URL variables](https://docs.meteor.com/api/email.html#Email-send).

Reaction supports sending mail over SMTP; the `MAIL_URL` environment variable should be of the form `smtp://USERNAME:PASSWORD@HOST:PORT`.

The Email dashboard provides a UI for quick configuration of the email server as well.

## Settings

You can use custom [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) by copying `settings/dev.settings.json` to `settings/settings.json`

For convenience, the initial Reaction administrator can be configured here.

Creating a `settings.json` will prevent the default `dev.settings.json` from being loaded when you use the `reaction` command to start Reaction.

Once you have edited the **_settings/settings.json_** you will need to run:

```sh
reaction reset && reaction
```

To reset the database.

**_settings/settings.json_**

```json
{
  "ROOT_URL": "",
  "MAIL_URL": "",
  "reaction": {
    "REACTION_USER": "<username>",
    "REACTION_AUTH": "<password>",
    "REACTION_EMAIL": "<login email>"
  },
  "isDebug": "info"
}
```

When the [`reaction-cli`](https://www.npmjs.com/package/reaction-cli) npm package is installed, `reaction` is the equivalent of `meteor --raw-logs --settings settings/<your-settings>.json`

## Initialization

Reaction application configuration is loaded on startup from `/private/settings/reaction.json`.

Use `reaction.json` to provide an initial pre-configuration of Reaction. This will not overwrite values that have been changed in existing data, but will add new or missing data.

**/private/settings/reaction.json**

```json
[
  [{
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
      "services": [{
        "facebook": {
          "appId": "",
          "secret": ""
        }
      }]
    }
  }, {
    "name": "reaction-paypal",
    "enabled": true,
    "settings": {
      "express": {
        "enabled": true
      },
      "express_mode": false,
      "merchantId": "",
      "username": "",
      "password": "",
      "signature": "",
      "payflow_enabled": true,
      "payflow_mode": false,
      "client_id": "",
      "client_secret": ""
    }
  }, {
    "name": "reaction-google-analytics",
    "enabled": false,
    "settings": {
      "public": {
        "api_key": ""
      }
    }
  }, {
    "name": "reaction-stripe",
    "enabled": true,
    "settings": {
      "api_key": ""
    }
  }, {
    "name": "reaction-social",
    "enabled": true,
    "settings": {
      "public": {
        "autoInit": true,
        "appsOrder": [
          "facebook",
          "twitter",
          "pinterest",
          "googleplus"
        ],
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
  }]
]
```

_Note: Where `name` is Reaction package name, the `settings` object will update the `Packages` collection on every restart/reload._

## Default Data

Reaction installs sample data, translations, and other fixture defaults from `/private/data/` and `/private/data/i18n` using the `Reaction.Import` class.

-   Products.json
-   Shipping.json
-   Shops.json
-   Tags.json

You can overwrite or delete these import files to alter the default data. If altered, the changed data will be merged with existing documents, but changes in the database will not overwrite on restart if there are no changes.

_Note: the `private` prefix is automatically removed by the [Meteor Assets](http://docs.meteor.com/api/assets.html) method (except when used in packages)._

## Importing Data

The `Reaction.Import` class provides import functionality.

See: [import.md](reaction-import.md) for documentation on `Reaction.Import`.

_Example import of shipping records_

```js
import { Meteor} from "meteor/meteor";
import { Reaction } from "/server/api";

Meteor.startup(function () {
  Reaction.Import.process(Assets.getText("data/Shipping.json"), ["name"], Reaction.Import.shipping);
  Reaction.Import.flush();
});
```

### loadSettings

```js
// server side secure import of settings
import { LoadSettings } from "/server/api";

LoadSettings(Assets.getText("settings/reaction.json"));
```

This `LoadSettings` method is made available in `server/api/core/index.js`. This is the method that Reaction uses to load package data on startup. This method can be used in custom plugins as well.
