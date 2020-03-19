---
id: version-3.0.0-internationalization
title: Internationalization
original_id: internationalization
---

Reaction clients should use [i18next](http://i18next.com/) for internationalization and UI translations.

The Reaction API server (specifically the `i18n` service) gathers translations from all registered plugins and serves them for clients at the standard `/locales/resources.json` route on the API server. Because any plugin can add a translation namespace, the service also adds a `/locales/namespaces.json` route, which returns the namespaces array. The i18next client library needs this list for initialization.

## Register translations from an API plugin

When it calls `registerPlugin`, a plugin can provide translations in an `i18n` object.

```js
registerPlugin({
  i18n: {
    translations: [{
      i18n: "en",
      ns: "reaction-inventory",
      translation: {
        "reaction-inventory": {
          inventorySettings: {
            cardTitle: "Inventory"
          }
        }
      }
    }]
  }
});
```

In each `translations` array item:
- The `translation` key has the translation object
- The first level of the translation object is the namespace, which must match the `ns` key. By convention this should match the plugin name.
- The `i18n` key is set to the language code.
- Beneath the namespace level, you can add any levels you want with any keys. When referencing translations in code, you will reference the object path of the translation text you want. In the example above, `inventorySettings.cardTitle` would resolve to the work "Inventory" if the current language is English.

## Supporting Multiple Languages in a Reaction Client

In browser code, initialize multi-language support like this, using latest `i18next` NPM packages:

```js
import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextFetch from "i18next-fetch-backend";
import i18nextMultiLoadBackendAdapter from "i18next-multiload-backend-adapter";
import { initReactI18next } from "react-i18next";

const configuredI18next = i18next
  // https://github.com/i18next/i18next-browser-languageDetector
  // Sets initial language to load based on `lng` query string
  // with various fallbacks.
  .use(i18nextBrowserLanguageDetector)
  // https://github.com/perrin4869/i18next-fetch-backend
  // This uses `fetch` to load resources from the backend based on `backend`
  // config object below.
  .use(i18nextMultiLoadBackendAdapter)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next);

/**
 * @summary Initializes i18next
 * @param {String} fallbackLng Language code to use if i18nextBrowserLanguageDetector fails
 * @return {undefined}
 */
async function initializeI18n(fallbackLng) {
  // Reaction does not have a predefined list of namespaces. Any API plugin can
  // add any namespaces. So we must first get the list of namespaces from the API.
  const namespaceResponse = await fetch(`${apiUrl}/locales/namespaces.json`);
  const allTranslationNamespaces = await namespaceResponse.json();

  await configuredI18next.init({
    backend: {
      backend: i18nextFetch,
      backendOption: {
        allowMultiLoading: true,
        loadPath: `${apiUrl}/locales/resources.json?lng={{lng}}&ns={{ns}}`
      }
    },
    debug: false,
    detection: {
      // We primarily set language according to `navigator.language`,
      // which is supported in all modern browsers and can be changed
      // in the browser settings. This is the same list that browsers
      // send in the `Accept-Language` header.
      //
      // For ease of testing translations, we also support `lng`
      // query string to override the browser setting.
      order: ["querystring", "navigator"]
    },
    ns: allTranslationNamespaces,
    defaultNS: "core", // reaction "core" is the default namespace
    fallbackNS: allTranslationNamespaces,
    fallbackLng
  });
}

initializeI18n("en").catch((error) => {
  console.error(error);
})
```

This will show the UI in the user's preferred language, based on their browser setting. For example, in Chrome, go to chrome://settings/languages and whatever language is listed first in your preferences list will be the language used.

To see the UI in a specific language, overriding your browser language, you can append `lng=<code>` in your query string. For example, `http://localhost:3000/?lng=en` or `http://localhost:3000/?lng=en-US` will show you English text even if your browser language is set to something else.

If some bit of text does not have a translation for the selected language, you will see it in English (the fallback language).

### Additional Translations

The API serves translations as a convenient way for multiple clients to be able to share the same translations. However, you may have additional client-specific translations that you want to live in the client codebase. You can give these their own namespace and merge them with the translations downloaded from the API when initializing `i18next`.

### Showing Translated Text in UI

The simplest way to use a translation after initializing `i18next` is by importing and using the `t` function:

```js
import i18next from "i18next";

const text = i18next.t("path.to.translation.key");
```

> We do not recommend providing a `defaultValue` because it masks the fact that you may have forgotten to add that key to the actual translation files.

Although this simple method works for non-reactive code, in a React component it is safer to use the [react-i18next](https://react.i18next.com/) package. Specifically, we recommend the [useTranslation hook](https://react.i18next.com/latest/usetranslation-hook).
