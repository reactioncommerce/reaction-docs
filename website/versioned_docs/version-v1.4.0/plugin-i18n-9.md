---
id: version-v1.4.0-plugin-i18n-9
title: i18n
original_id: plugin-i18n-9
---
    
Reaction Commerce has been localized from the very start, and allows plugins to also add internationalization (heretofore call i18n)
using the [http://i18next.com/](http://i18next.com/) library.

The process is simple and just involves these steps:

1. Determine the strings that need to be localized
1. Create keys for these strings and the default text
1. Add some bootstrap code to load these translations into the db

For the purposes of our tutorial we haven't really added any functionality we can translate, so let's add a little code
to our "debug" HTML we added to the core layout that gives us some info about the current layout and workflow.

So to our `core.html` let's all these lines right after the `main` section

```html
    <div class="rui beesknees"> <!--- So you wouldn't want to actually have this here but it's good for some examples -->
      <div class="bkdebug"><em>Using Bee's Knees layout</em></div>
      <div class="bkdebug"><em>layoutHeader template: </em>{{layoutHeader}}</div>
      <div class="bkdebug"><em>layoutFooter template: </em>{{layoutFooter}}</div>
      <div class="bkdebug"><em>Main Layout: </em>{{template}}</div>
    </div>
```

So let's say we determined that we wanted to localize the term "Main Layout". First let's add a `i18n` directory to our
server folder. And in that folder let's create an `en.json` file and add this to it.

```json
[{
    "language": "English",
    "i18n": "en",
    "ns": "beesknees",
    "translation": {
        "beesknees": {
          "navbar": {
            "beeskneesLayout": "Translated Bee's Knees Layout",
            "mainTemplate": "Translated Main Template"
          }
        }
    }
}]
```

What we've done there is added our "beesknees" namespace (that's what `ns` stands for) and then put our keys in there, with
a navbar key so that as we expand our plugin we have room to grow.

Now we need to load that file into the translations. So let's create another file in the `i18n` directory called `index.js`
and add this code.

```js
import { loadTranslations } from "/server/startup/i18n";
import en from "./en.json";
loadTranslations([en]);
```

You will then want to add an import for `i18n` to the server-level `index.js`. This function will then get run on
server startup. (You will need to stop and restart for the translation to be loaded)

Then we want to back to our HTML and add the the helpers. So for our two translated lines we add this attribute

```html
data-i18n="beesknees.navbar.beeskneesLayout"
```

For the "Bee's Knees Layout" and

```html
data-i18n="beesknees.navbar.mainTemplate"
```

for the "Main Layout"

When you stop and restart the translations will be loaded. Now of course it won't look any different because we only
have English loaded and even if you switch languages you still only have English, but if you added another translation there
those strings would show the translated version. This allows you to add new language support by just adding additional JSON
files and calling `loadTranslations` on them.

Next: [Final Thoughts](plugin-complete-10.md)

## Read More

[i18n](i18n.md)

[18next](http://i18next.com/)
