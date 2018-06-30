---
original_id: internationalization
id: version-v1.1.0-internationalization
title: Internationalization
---
    
We are using the [http://i18next.com/](http://i18next.com/) internationalization eco system and generally support the features of i18next. We've implemented Reaction specific helpers that load and attach i18n keys and labels to many components, as well as namespacing, import tooling, and pluralization.  Right-to-left (RTL) and LTR handling has been implemented as required by RTL languages and detected by i18next.

## i18n import

On initial server startup, Reaction loads [i18next compatible translation source](http://i18next.com/docs/jsons/) into the _Assets_ collection.

After the core init hooks have processed, Reaction loads all the i18n source from the _Assets_ collection into the `Reaction.Import` buffer that upserts all _Assets_ into the _Translations_ collection.

Source can come from files in the `private/data/i18n` folder, but can also load from
imports or another direct source. Import the `loadTranslation` or `loadTranslations` method from
`server/startup/i18n`.

```js
import { loadTranslations } from "/server/startup/i18n";
import en from "./en.json";
loadTranslations([en]);
```

The translation object requires a json object with the `i18n`, `ns`, `translation` and `translation[namespace]` values to be defined.

```js
[{
  "i18n": "en", // language key
  "ns": "reaction-custom-package", // your package
  "translation": {
    "reaction-payments": { // your package or a package as a group namespace
      "admin": { // this is your structure
        "shortcut": {
          "customPackageLabel": "Custom Package"
        }
      }
    }
  }
}]
```

This object gets stored in the _Assets_ collection. The data is not shop specific, and can be used for a source of restorable default data, or as fixture data for new shop instances.  The _Assets_ collection is server only, and acts as a queue on initial startup as well,
ensuring that data loaded using `loadTranslations` can be imported before `shopId` is available on a fresh install.

 The _Translations_ collection can also be updated to customize the translation dictionary, as there is not a UI for this yet, you'd want to determine the best way to update the collection for your requirements.

## Namespacing

In addition to determining the client's current locale, on Meteor.startup in `client/modules/i18n` we fetch an array of enabled packages and attach these to the i18next object exported to the client. This contains the translations for the current namespace, and all matching package namespaces, and is used for the phrase dictionary. This dictionary is not reactive and you must refresh for updated translations.

Package names and namespaces must match otherwise the namespace will be ignored in the i18next export.
