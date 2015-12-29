# Configuration

## reaction.json

Reaction uses `private/data/reaction.json` for loading custom Reaction configuration settings.

> See [settings and fixture data documentation](https://github.com/reactioncommerce/reaction/blob/master/docs/developer/deploying.md).


## Meteor Environment Settings
Copy the optional `settings/dev.settings.json` to `<your-settings>.json` and run:

```
 meteor --settings settings/<your-settings>.json
```

**_settings/dev.settings.json_**

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

You can provide a custom settings `/settings/settings.json` file. Creating this file will prevent the default `dev.settings.json` from being loaded.

