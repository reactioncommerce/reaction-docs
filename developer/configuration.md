# Configuration
Reaction uses `private/settings/reaction.json` for the configuration of Reaction packages and  [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) for initial administrator and server setup.

## Meteor settings
You can use custom [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings) by copying `settings/dev.settings.json` to `settings/settings.json`

For convenience, the initial Reaction administrator can be configured here.

**_settings/settings.json_**

```
{
  "ROOT_URL": "",
  "MONGO_URL": "",
  "MAIL_URL": "",
  "reaction": {
    "REACTION_USER": "<username>",
    "REACTION_AUTH": "<password>",
    "REACTION_EMAIL": "<login email>"
  },
  "isDebug": "info"
}
```

 Creating `settings.json` will prevent the default `dev.settings.json` from being loaded when you use the `./reaction` command to start Reaction.

`./reaction` is the equivalent of `meteor --settings settings/<your-settings>.json`

### Environment variables
You can also use `environment` variables for settings, useful for headless and automated vm configuration.

The `REACTION_EMAIL`, `REACTION_USER`, `REACTION_AUTH` environment variables will configure the default administrator account. These variables and `isDebug` are the only _Reaction specific_ variables used from settings.json.

```bash
export ROOT_URL=""
export MONGO_URL="<your mongodb connect string>"
export MAIL_URL="<smtp connection string>"

export REACTION_USER="<username>"
export REACTION_AUTH="<password>"
export REACTION_EMAIL="<login email>"
```

_Note: Environment variables will override variables set in settings.json_

#### ROOT_URL
_Export `ROOT_URL` and [packages/reaction-core/registry.js](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-core/server/registry.js) will update the domain in the `shops` collection to match the domain from `ROOT_URL`._ This lets you use alternate domains, or enforce SSL on a fresh installation.  An empty ROOT_URL will just default to _localhost_.

#### MAIL_URL
To send email you should configure the administrative SMTP email server. [env MAIL_URL variable](https://docs.meteor.com/#email_send)

_Note: This is not required, but password reset, and a few other items that use email templates won't work unless you configure this._

#### isDebug
Set the [logging level](/developer/architecture/logging.md). Defaults to `info`.

Accepts `true`,`false` or a [Bunyan](https://github.com/trentm/node-bunyan) logging level.

## Reaction configuration
Reaction packages configuration and settings are loaded on startup from `private/settings/reaction.json`

**private/settings/reaction.json**

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

Note: _Where `name` is Reaction package name, the `settings` object will update the `Packages` collection on every restart/reload._

This `ReactionRegistry.loadSettings` method is used in `server/fixtures.js` to load Reaction package data on startup. This method can be used in custom packages as well.

```js
ReactionRegistry.loadSettings(Assets.getText("settings/reaction.json"));
```

## Importing Data
The `reaction-core` package installs sample data, translations, and other fixture defaults from `packages/reaction-sample-data/private/data/`.

The `ReactionImport` class provides import functionality.

See: [import.md](/developer/core/import.md) for documentation on `ReactionImport`.

_Example import of shipping records_

```js
Meteor.startup(function () {
  ReactionImport.process(Assets.getText("private/data/Shipping.json"), ["name"], ReactionImport.shipping);
  ReactionImport.flush();
});
```
