# Configuration

Reaction uses `/private/settings/reaction.json` for the configuration of Reaction packages and [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) for initial administrator and server setup.

## Meteor Settings

You can use custom [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) by copying `settings/dev.settings.json` to `settings/settings.json`

For convenience, the initial Reaction administrator can be configured here.

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

Creating a `settings.json` will prevent the default `dev.settings.json` from being loaded when you use the `reaction` command to start Reaction.

Once you have edited the **_settings/settings.json_** you will need to run:
```sh
reaction reset && reaction 
```
To reset the database.


When the [`reaction-cli`](https://www.npmjs.com/package/reaction-cli) npm package is installed, `reaction` is the equivalent of `meteor --raw-logs --settings settings/<your-settings>.json`

### Environment variables

You can also use `environment` variables for settings, useful for headless and automated vm configuration.

The `REACTION_EMAIL`, `REACTION_USER`, `REACTION_AUTH` environment variables will configure the default administrator account. These variables and `isDebug` are the only _Reaction specific_ variables used from settings.json.

```sh
export ROOT_URL=""
export MONGO_URL="<your mongodb connect string>"
export MAIL_URL="<smtp connection string>"

export REACTION_USER="<username>"
export REACTION_AUTH="<password>"
export REACTION_EMAIL="<login email>"
```

_Note: Environment variables will override variables set in settings.json_

You can also assign these variables before the command.

```sh
MONGO_URL=mongodb://xxxxxxxx reaction
```

#### ROOT_URL

_Export `ROOT_URL` and [packages/reaction-core/registry.js](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-core/server/registry.js) will update the domain in the `shops` collection to match the domain from `ROOT_URL`._ This lets you use alternate domains, or enforce SSL on a fresh installation. An empty ROOT_URL will just default to _localhost_.

#### MAIL_URL

To send email you should configure the administrative SMTP email server. [env MAIL_URL variable](https://docs.meteor.com/#email_send)

_Note: This is not required, but password reset, and a few other items that use email templates won't work unless you configure this._

#### isDebug

Set the [logging level](/developer/architecture/logging.md). Defaults to `info`.

Accepts `true`,`false` or a [Bunyan](https://github.com/trentm/node-bunyan) logging level.

## Default Data

Reaction installs sample data, translations, and other fixture defaults from `/private/data/` and `/private/data/i18n` using the `Reaction.Import` class.

- Products.json
- Shipping.json
- Shops.json
- Tags.json

You can overwrite or delete these import files to alter the default data. If altered, the changed data will be merged with existing documents, but changes in the database will not overwrite on restart if there are no changes.

_Note: the `private` prefix is automatically removed by the [Meteor Assets](http://docs.meteor.com/api/assets.html) method (except when used in packages)._

## Importing Data

The `Reaction.Import` class provides import functionality.

See: [import.md](/developer/core/import.md) for documentation on `Reaction.Import`.

_Example import of shipping records_

```js
import { Meteor} from "meteor/meteor";
import { Reaction } from "/server/api";

Meteor.startup(function () {
  Reaction.Import.process(Assets.getText("data/Shipping.json"), ["name"], Reaction.Import.shipping);
  Reaction.Import.flush();
});
```

## Reaction Configuration

Reaction application configuration is loaded on startup from `/private/settings/reaction.json`

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
      "express_enabled": true,
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

### loadSettings

```js
// server side secure import of settings
import { LoadSettings } from "/server/api";

LoadSettings(Assets.getText("settings/reaction.json"));
```

This `LoadSettings` method is made available in `server/api/core/index.js`. This is the method that Reaction uses to load package data on startup. This method can be used in custom plugins as well.
